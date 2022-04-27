import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import AdminTabsLayout from '../../components/AdminTabsLayout'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'
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

const SalesOrdersPageContent = () => {
    const SalesOrdersContext = useSalesOrdersContext()
    const CustomersContext = useCustomersContext()
    const InventoryContext = useInventoryContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        CustomersContext.listCustomers()
        SalesOrdersContext.listOrders()
        InventoryContext.listProducts()
    }, [])

    return (
        <AdminTabsLayout
            addButton="Add Order"
            tableButton="Orders"
            AddContent={<Content1 />}
            TableContent={<SalesOrdersTable />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const Content1 = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const { standardAddMethod, user } = useAuthContext()
    const onSubmit = async ({ soCustomer, soProduct, soRemarks }) => {
        setLoading(true)
        const soDate = new Date()
        const soSalesRep = user.id
        await standardAddMethod(
            'salesOrder',
            { soCustomer, soProduct, soRemarks, soDate, soSalesRep },
            'Sales Order'
        )
        document.getElementById('add_so_form').reset()
        setLoading(false)
    }

    return (
        <form id="add_so_form" onSubmit={handleSubmit(onSubmit)}>
            <SelectInput
                inputID="soCustomer"
                collection="customer"
                collectionKey="customerName"
                inputName="Customer"
                isRequired
                register={register}
            />
            <SelectInput
                inputID="soProduct"
                collection="product"
                collectionKey="productName"
                inputName="Product"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="soRemarks"
                inputName="Remarks"
                inputType="text"
                isRequired={false}
                register={register}
            />
            <Button text="Add Order" loading={loading} className="" />
        </form>
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
