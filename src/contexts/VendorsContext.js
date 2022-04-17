import React, { createContext, useContext, useMemo, useState } from 'react'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { useAuthContext } from './AuthContext'
import { db } from '../lib/firebase'

const VendorsContext = createContext()

const VendorsContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const AuthContext = useAuthContext()
    const [vendors, setVendors] = useState([])

    const listVendors = async () => {
        if (AuthContext.user?.role !== 'admin') return [false]
        const fetchedVendors = []

        try {
            const querySnap = await getDocs(collection(db, 'vendor'))

            querySnap.forEach((d) => {
                fetchedVendors.push({ ...d.data(), id: d.id })
            })

            setVendors(fetchedVendors)
            return [true, fetchedVendors]
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return [false]
        }
    }

    const updateVendor = async (id, field, value) => {
        if (AuthContext.user?.role !== 'admin') return [false]

        try {
            await updateDoc(doc(db, 'vendor', id), {
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

        //  uppdate local vendor
        setVendors((prev) =>
            prev.map((vendor) => {
                if (vendor.id !== id) return vendor

                return { ...vendor, [field]: value }
            })
        )

        return [true]
    }

    const value = useMemo(
        () => ({ listVendors, vendors, updateVendor }),
        [vendors, AuthContext.user]
    )

    return (
        <VendorsContext.Provider value={value}>
            {children}
        </VendorsContext.Provider>
    )
}

const useVendorsContext = () => useContext(VendorsContext)

export { VendorsContext, VendorsContextProvider, useVendorsContext }
