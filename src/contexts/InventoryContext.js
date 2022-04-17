import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'
import { db } from '../lib/firebase'

const InventoryContext = createContext()

const InventoryContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [products, setProducts] = useState([])

    const listProducts = async () => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const fetchedProducts = []

        try {
            const querySnap = await getDocs(collection(db, 'product'))

            querySnap.forEach((d) => {
                fetchedProducts.push({ ...d.data(), id: d.id })
            })

            setProducts(fetchedProducts)
            return [true, fetchedProducts]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const updateProduct = async (id, field, value) => {
        if (AuthContext.user?.role !== 'admin') return [false]

        try {
            await updateDoc(doc(db, 'product', id), {
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

        //  uppdate local product
        setProducts((prev) =>
            prev.map((product) => {
                if (product.id !== id) return product

                return { ...product, [field]: value }
            })
        )

        return [true]
    }

    const value = useMemo(
        () => ({ listProducts, products, updateProduct }),
        [products, AuthContext.user]
    )

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    )
}

const useInventoryContext = () => useContext(InventoryContext)

export { InventoryContext, InventoryContextProvider, useInventoryContext }
