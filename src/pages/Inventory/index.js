import React, { useState, useEffect } from 'react'
import AdminTabsLayout from '../../layouts/AdminTabsLayout'
import ProductTable from './ProductTable'
import {
    InventoryContextProvider,
    useInventoryContext,
} from '../../contexts/InventoryContext'
import AddProductForm from './AddProductForm'

const InventoryPageContent = () => {
    const InventoryContext = useInventoryContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        InventoryContext.listProducts()
    }, [])

    return (
        <AdminTabsLayout
            addButton="Add Product"
            tableButton="Products"
            AddContent={<AddProductForm />}
            TableContent={<ProductTable />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const InventoryPage = () => (
    <InventoryContextProvider>
        <InventoryPageContent />
    </InventoryContextProvider>
)
export default InventoryPage
