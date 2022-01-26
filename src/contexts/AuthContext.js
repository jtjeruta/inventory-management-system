import React, { createContext, useContext, useMemo, useState } from 'react'
import {
    getAuth as getFirebaseAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import { useAppContext } from './AppContext'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [user, setUser] = useState(null)

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

            setUser({ ...loginUser, ...docSnap.data() })

            AppContext.addNotification({
                type: 'success',
                title: 'Hi!',
                content: 'Welcome back.',
            })

            return [true, loginUser]
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
        const auth = getAuth()

        if (!auth) return [false]

        try {
            await signOut(auth)
            setUser(null)
            return [true]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }
    }

    const value = useMemo(
        () => ({
            signin,
            signout,
            user,
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
