import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
    collectionGroup,
    where,
    query,
    updateDoc,
} from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [authenticating, setAuthenticating] = useState(true)
    const [user, setUser] = useState(null)

    const getUserDetails = async (id) => {
        try {
            const docSnap = await getDoc(doc(db, 'user-details', id))

            if (!docSnap.exists()) {
                throw new Error('user details not found')
            }

            return docSnap.data()
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return null
        }
    }
    const getDocsOfCollection = async (
        id,
        name,
        specificFieldName,
        specificFieldValue
    ) => {
        try {
            const map = []
            let querySnap = null
            if (
                specificFieldName !== undefined &&
                specificFieldValue !== undefined
            ) {
                if (
                    Array.isArray(specificFieldName) &&
                    Array.isArray(specificFieldValue)
                ) {
                    const tempWhereArray = []
                    for (let i = 0; i < specificFieldName.length; i += 1) {
                        tempWhereArray.push(
                            where(
                                specificFieldName[i],
                                '==',
                                specificFieldValue[i]
                            )
                        )
                    }
                    querySnap = await getDocs(
                        query(collection(db, id), ...tempWhereArray)
                    )
                } else {
                    querySnap = await getDocs(
                        query(
                            collection(db, id),
                            where(specificFieldName, '==', specificFieldValue)
                        )
                    )
                }
            } else {
                querySnap = await getDocs(collectionGroup(db, id))
            }
            if (name === undefined || name === null) {
                querySnap.forEach((docIteration) => {
                    map.push([docIteration.id, docIteration.data()])
                })
            } else {
                querySnap.forEach((docIteration) => {
                    map.push([docIteration.id, docIteration.data()[name]])
                })
            }
            return map
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return null
        }
    }
    const getFullDocsOfCollection = async (id) => {
        try {
            const querySnap = await getDocs(collectionGroup(db, id))
            const map = []
            querySnap.forEach((docIteration) => {
                map.push([docIteration.id, docIteration.data()])
            })
            return map
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return null
        }
    }
    const updateStatus = async (collectionName, id, name, status) => {
        try {
            const notifStatusText = status ? 'enabled' : 'disabled'
            const docRef = doc(db, collectionName, id)
            updateDoc(docRef, {
                isEnabled: status,
            })
            AppContext.addNotification({
                type: 'success',
                title: `Category ${notifStatusText}`,
                content: `The ${name} Category has been ${notifStatusText}`,
            })
            return [true]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return null
        }
    }

    // Listen to onAuthStateChanged
    useEffect(() => {
        setAuthenticating(true)

        auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userDetails = await getUserDetails(authUser.uid)
                if (!userDetails) return
                setUser({
                    id: authUser.uid,
                    email: authUser.email,
                    ...userDetails,
                })
            }

            setAuthenticating(false)
        })
    }, [])

    const signin = async (email, password) => {
        let loginUser = null

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            loginUser = {
                id: response.user.uid,
                email: response.user.email,
            }
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        const userDetails = await getUserDetails(loginUser.id)

        if (!userDetails) return [false]

        setUser({ ...loginUser, ...userDetails })

        AppContext.addNotification({
            type: 'success',
            title: `Hi ${userDetails.firstName}!`,
            content: 'Welcome back.',
        })

        return [true, loginUser]
    }
    const standardAddMethod = async (
        collectionName,
        fields,
        notifTextGeneral,
        notifTextSpecific
    ) => {
        let titleText = ''
        let contentText = ''
        try {
            addDoc(collection(db, collectionName), fields)
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }
        if (notifTextGeneral === undefined) {
            titleText = 'Adding Successful!'
        } else {
            titleText = `Successfully added ${notifTextGeneral}!`
        }
        if (notifTextSpecific === undefined) {
            contentText = 'Data successfully stored to the database'
        } else {
            contentText = `${notifTextSpecific} has been added`
        }

        AppContext.addNotification({
            type: 'success',
            title: titleText,
            content: contentText,
        })

        return [true]
    }

    const standardUpdateMethod = async (
        collectionName,
        id,
        fields,
        notifTextGeneral,
        notifTextSpecific
    ) => {
        let titleText = ''
        let contentText = ''
        try {
            updateDoc(doc(db, collectionName, id), fields)
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }
        if (notifTextGeneral === undefined) {
            titleText = 'Updating Successful!'
        } else {
            titleText = `Successfully updated ${notifTextGeneral}!`
        }
        if (notifTextSpecific === undefined) {
            contentText = 'Data successfully stored to the database'
        } else {
            contentText = `${notifTextSpecific} has been updated`
        }

        AppContext.addNotification({
            type: 'success',
            title: titleText,
            content: contentText,
        })

        return [true]
    }

    const uniqueAddMethod = async (
        collectionName,
        fields,
        checkerfield,
        checker,
        notifTextGeneral,
        notifTextSpecific
    ) => {
        try {
            return getDocs(
                query(
                    collection(db, collectionName),
                    where(checkerfield, '==', checker)
                )
            ).then((data) => {
                if (data.docs.length > 0) {
                    AppContext.addNotification({
                        type: 'error',
                        title: `Failed to add ${notifTextSpecific}`,
                        content: `That ${notifTextGeneral} already exists!`,
                    })
                    return [false]
                }
                addDoc(collection(db, collectionName), fields)
                AppContext.addNotification({
                    type: 'success',
                    title: `Successfully added ${notifTextGeneral}!`,
                    content: `${notifTextSpecific} ${notifTextGeneral} has been added`,
                })
                return [true]
            })
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }
    }

    const signout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        setUser(null)
        return [true]
    }

    const value = useMemo(
        () => ({
            signin,
            signout,
            standardAddMethod,
            standardUpdateMethod,
            uniqueAddMethod,
            updateStatus,
            user,
            authenticating,
            getDocsOfCollection,
            getFullDocsOfCollection,
        }),
        [user, authenticating]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
