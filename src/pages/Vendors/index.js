import React, { useState, useEffect } from 'react'
import {
    useVendorsContext,
    VendorsContextProvider,
} from '../../contexts/VendorsContext'
import AdminTabsLayout from '../../layouts/AdminTabsLayout'
import AddVendorForm from './AddVendorForm'
import VendorTable from './VendorTable'

const VendorsPageContent = () => {
    const VendorsContext = useVendorsContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        VendorsContext.listVendors()
    }, [])

    return (
        <AdminTabsLayout
            addButton="Add Vendor"
            tableButton="Vendors"
            AddContent={<AddVendorForm />}
            TableContent={<VendorTable />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const VendorsPage = () => (
    <VendorsContextProvider>
        <VendorsPageContent />
    </VendorsContextProvider>
)

export default VendorsPage
