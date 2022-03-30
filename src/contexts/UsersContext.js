import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'

import { db } from '../lib/firebase'
import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'

const UsersContext = createContext()

const UsersContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [users, setUsers] = useState([])

    const listUsers = async () => {
        if (AuthContext.user?.role !== 'admin') return
        const fetchedUsers = []

        try {
            const querySnap = await getDocs(collection(db, 'user-details'))

            querySnap.forEach((doc) => {
                fetchedUsers.push({ ...doc.data(), id: doc.id })
            })

            setUsers(fetchedUsers)
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
        }
    }

    const value = useMemo(
        () => ({ users, listUsers }),
        [users, AuthContext.user]
    )

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    )
}

const useUsersContext = () => useContext(UsersContext)

export { UsersContext, UsersContextProvider, useUsersContext }
