import React, { useState, useEffect } from 'react'
import AdminTabsLayout from '../../layouts/AdminTabsLayout'
import ProductTable from './ProductTable'
import { useInventoryContext } from '../../contexts/InventoryContext'
import AddProductForm from './AddProductForm'

const InventoryPage = () => {
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

export default InventoryPage
