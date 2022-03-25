import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react'
import {
    getAuth as getFirebaseAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import {
    getFirestore,
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
import { initFirebase } from '../lib/firebase'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [authenticating, setAuthenticating] = useState(false)
    const [user, setUser] = useState(null)

    initFirebase()

    const auth = getFirebaseAuth()
    const db = getFirestore()

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
    const getDocsOfCollection = async (id, name) => {
        try {
            const querySnap = await getDocs(collectionGroup(db, id))
            const map = []
            if (name === undefined) {
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
    const updateStatus = async (collectionName, id, name, status) => {
        try {
            let notifStatusText = status ? 'enabled' : 'disabled'
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
            console.log(id)
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

    const productCategoryAdd = async (productCategoryName) => {
        let productCategoryAddChecker = null
        const productCategoryNameChecker = productCategoryName.toLowerCase()
        const isEnabled = true
        try {
            productCategoryAddChecker = {
                productCategoryName,
                productCategoryNameChecker,
                isEnabled,
            }
            return getDocs(
                query(
                    collection(db, 'productCategory'),
                    where(
                        'productCategoryNameChecker',
                        '==',
                        productCategoryNameChecker
                    )
                )
            ).then((data) => {
                if (data.docs.length > 0) {
                    AppContext.addNotification({
                        type: 'error',
                        title: `Failed to add ${productCategoryName}`,
                        content: 'That Category already exists!',
                    })
                    return [false]
                }
                addDoc(
                    collection(db, 'productCategory'),
                    productCategoryAddChecker
                )
                AppContext.addNotification({
                    type: 'success',
                    title: 'Successfully added Product Category!',
                    content: `${productCategoryName} Category has been added`,
                })
                return [true]
            })
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.2',
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
            productCategoryAdd,
            updateStatus,
            user,
            authenticating,
            getDocsOfCollection,
        }),
        [user, authenticating]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
