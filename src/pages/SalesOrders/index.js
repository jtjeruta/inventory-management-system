import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import AdminTabsLayout from '../../layouts/AdminTabsLayout'
import SalesOrdersTable from './SalesOrdersTable'
import {
    SalesOrdersContextProvider,
    useSalesOrdersContext,
} from '../../contexts/SalesOrdersContext'
import {
    CustomersContextProvider,
    useCustomersContext,
} from '../../contexts/CustomersContext'
import {
    InventoryContextProvider,
    useInventoryContext,
} from '../../contexts/InventoryContext'
import AddOrder from './AddOrder'
import EmployeeLayout from '../../layouts/EmployeeLayout'

const SalesOrdersPageContent = () => {
    const AuthContext = useAuthContext()
    const SalesOrdersContext = useSalesOrdersContext()
    const CustomersContext = useCustomersContext()
    const InventoryContext = useInventoryContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        CustomersContext.listCustomers()
        SalesOrdersContext.listOrders()
        InventoryContext.listProducts()
    }, [])

    return AuthContext.user.role === 'admin' ? (
        <AdminTabsLayout
            addButton="Add Order"
            tableButton="Orders"
            AddContent={<AddOrder />}
            TableContent={<SalesOrdersTable />}
            setTab={setTab}
            tab={tab}
        />
    ) : (
        <EmployeeLayout>
            <AddOrder />
        </EmployeeLayout>
    )
}

const SalesOrdersPage = () => (
    <SalesOrdersContextProvider>
        <CustomersContextProvider>
            <InventoryContextProvider>
                <SalesOrdersPageContent />
            </InventoryContextProvider>
        </CustomersContextProvider>
    </SalesOrdersContextProvider>
)

export default SalesOrdersPage
