import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [authenticating, setAuthenticating] = useState(false)
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
            user,
            authenticating,
        }),
        [user, authenticating]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
