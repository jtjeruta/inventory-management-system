import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection, updateDoc, doc, getDoc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'
import { db } from '../lib/firebase'

const COLLECTION = 'product'
const InventoryContext = createContext()

const InventoryContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    const getProduct = async (productId) => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const loadingKey = 'get-product'
        AppContext.addLoading(loadingKey)

        try {
            const docSnap = await getDoc(doc(db, COLLECTION, productId))

            if (docSnap.exists()) {
                const product = docSnap.data()
                setSelectedProduct({ ...product, id: productId })
                AppContext.removeLoading(loadingKey)
                return [true, product]
            }

            AppContext.removeLoading(loadingKey)
            AppContext.addNotification({
                type: 'error',
                title: 'Product not found.',
                content: 'Please check id and try again.',
            })
            return [false]
        } catch (err) {
            AppContext.removeLoading(loadingKey)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const listProducts = async () => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const loadingKey = 'list-products'
        AppContext.addLoading(loadingKey)
        const fetchedProducts = []

        try {
            const querySnap = await getDocs(collection(db, COLLECTION))

            querySnap.forEach((d) => {
                fetchedProducts.push({ ...d.data(), id: d.id })
            })

            setProducts(fetchedProducts)
            AppContext.removeLoading(loadingKey)
            return [true, fetchedProducts]
        } catch (error) {
            AppContext.removeLoading(loadingKey)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const updateProductField = async (id, field, value) => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const loadingKey = 'update-product-field'
        AppContext.addLoading(loadingKey)

        try {
            await updateDoc(doc(db, COLLECTION, id), {
                [field]: value,
            })
        } catch (error) {
            AppContext.removeLoading(loadingKey)
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

        AppContext.removeLoading(loadingKey)
        return [true]
    }

    const updateProduct = async (id, data) => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const loadingKey = 'update-product'
        AppContext.addLoading(loadingKey)

        try {
            await updateDoc(doc(db, COLLECTION, id), data)
        } catch (error) {
            AppContext.removeLoading(loadingKey)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }

        //  uppdate local product
        setSelectedProduct((prev) => ({ ...prev, ...data }))

        AppContext.addNotification({
            type: 'success',
            title: 'Save successful!',
            content: 'Product has been saved.',
        })

        AppContext.removeLoading(loadingKey)
        return [true]
    }

    const value = useMemo(
        () => ({
            getProduct,
            listProducts,
            products,
            selectedProduct,
            setSelectedProduct,
            updateProduct,
            updateProductField,
        }),
        [products, AuthContext.user, selectedProduct]
    )

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    )
}

const useInventoryContext = () => useContext(InventoryContext)

export { InventoryContext, InventoryContextProvider, useInventoryContext }
