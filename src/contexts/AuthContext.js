import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    getAuth as getFirebaseAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import localforage from 'localforage'

import { useAppContext } from './AppContext'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [authenticating, setAuthenticating] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const init = async () => {
            setAuthenticating(true)

            try {
                const localUser = await localforage.getItem('user')
                setUser(localUser)
            } catch (_) {
                AppContext.addNotification({
                    type: 'error',
                    title: 'Authentication failed.',
                    content: 'Please contact support.',
                })
            }

            setAuthenticating(false)
        }

        init()
    }, [])

    const getAuth = () => {
        try {
            const auth = getFirebaseAuth()
            return auth
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Authentication failed.',
                content: 'Please contact support.',
            })

            return null
        }
    }

    const signin = async (email, password) => {
        const auth = getAuth()
        const db = getFirestore()

        if (!auth) return [false]

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

        try {
            const docSnap = await getDoc(doc(db, 'user-details', loginUser.id))

            if (!docSnap.exists()) {
                throw new Error('user details not found')
            }

            loginUser = { ...loginUser, ...docSnap.data() }
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        try {
            await localforage.setItem('user', loginUser)
        } catch (_) {
            AppContext.addNotification({
                type: 'error',
                title: 'Failed to save user to storage.',
                content: 'Please contact support.',
            })
        }

        setUser(loginUser)

        AppContext.addNotification({
            type: 'success',
            title: `Hi ${loginUser.firstName}!`,
            content: 'Welcome back.',
        })

        return [true, loginUser]
    }

    const signout = async () => {
        const auth = getAuth()

        if (!auth) return [false]

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

        try {
            await localforage.removeItem('user')
        } catch (_) {
            AppContext.addNotification({
                type: 'error',
                title: 'Failed to delete user from storage.',
                content: 'Please contact support.',
            })
        }

        setUser(null)
        return [true]
    }

    const value = useMemo(
        () => ({
            signin,
            signout,
            user,
            authenticating,
        }),
        [user, authenticating]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
