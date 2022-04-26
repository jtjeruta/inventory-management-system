import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'
import { db } from '../lib/firebase'

const COLLECTION = 'customer'

const CustomersContext = createContext()

const CustomersContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [customers, setCustomers] = useState([])

    const listCustomers = async () => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const fetchedCustomers = []

        try {
            const querySnap = await getDocs(collection(db, COLLECTION))

            querySnap.forEach((d) => {
                fetchedCustomers.push({ ...d.data(), id: d.id })
            })

            setCustomers(fetchedCustomers)
            return [true, fetchedCustomers]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const updateCustomer = async (id, field, value) => {
        if (AuthContext.user?.role !== 'admin') return [false]

        try {
            await updateDoc(doc(db, COLLECTION, id), {
                [field]: value,
            })
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }

        //  uppdate local customer
        setCustomers((prev) =>
            prev.map((customer) => {
                if (customer.id !== id) return customer

                return { ...customer, [field]: value }
            })
        )

        return [true]
    }

    const value = useMemo(
        () => ({ listCustomers, customers, updateCustomer }),
        [customers, AuthContext.user]
    )

    return (
        <CustomersContext.Provider value={value}>
            {children}
        </CustomersContext.Provider>
    )
}

const useCustomersContext = () => useContext(CustomersContext)

export { CustomersContext, CustomersContextProvider, useCustomersContext }
