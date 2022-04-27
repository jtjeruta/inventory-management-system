import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'
import { db } from '../lib/firebase'

const COLLECTION = 'salesOrder'

const SalesOrdersContext = createContext()

const SalesOrdersContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [orders, setOrders] = useState([])

    const listOrders = async () => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const fetchedOrders = []

        try {
            const querySnap = await getDocs(collection(db, COLLECTION))

            querySnap.forEach((d) => {
                fetchedOrders.push({ ...d.data(), id: d.id })
            })

            setOrders(fetchedOrders)
            return [true, fetchedOrders]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const updateOrder = async (id, field, value) => {
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

        //  uppdate local salesOrder
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id !== id) return order

                return { ...order, [field]: value }
            })
        )

        return [true]
    }

    const value = useMemo(
        () => ({ listOrders, orders, updateOrder }),
        [orders, AuthContext.user]
    )

    return (
        <SalesOrdersContext.Provider value={value}>
            {children}
        </SalesOrdersContext.Provider>
    )
}

const useSalesOrdersContext = () => useContext(SalesOrdersContext)

export { SalesOrdersContext, SalesOrdersContextProvider, useSalesOrdersContext }
