import React, { createContext, useContext, useMemo, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAppContext } from './AppContext'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [user, setUser] = useState(null)

    const signin = async () => {
        const auth = getAuth()

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                'jt.jeruta@gmail.com',
                'password'
            )

            setUser(response.user)

            AppContext.addNotification({
                type: 'success',
                title: 'Hi!',
                content: 'Welcome back.',
            })

            return [true, user]
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
