import React, { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AdminTabsLayout from '../../layouts/AdminTabsLayout'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'
import DateInput from '../../components/GeneralDateInput'
import {
    PurchaseOrdersContextProvider,
    usePurchaseOrdersContext,
} from '../../contexts/PurchaseOrdersContext'
import {
    VendorsContextProvider,
    useVendorsContext,
} from '../../contexts/VendorsContext'
import {
    InventoryContextProvider,
    useInventoryContext,
} from '../../contexts/InventoryContext'
import DataTable from '../../components/DataTable'

const PurchaseOrdersContent = () => {
    const PurchaseOrdersContext = usePurchaseOrdersContext()
    const InventoryContext = useInventoryContext()
    const VendorsContext = useVendorsContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        PurchaseOrdersContext.listOrders()
        VendorsContext.listVendors()
        InventoryContext.listProducts()
    }, [])

    return (
        <AdminTabsLayout
            addButton="Add Order"
            tableButton="Orders"
            AddContent={<Content1 />}
            TableContent={<TableContent />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const Content1 = () => {
    const methods = useForm()
    const [loading, setLoading] = useState(false)
    const { standardAddMethod } = useAuthContext()

    const onSubmit = async (values) => {
        setLoading(true)
        await standardAddMethod('purchaseOrder', values, 'Product Order')
        document.getElementById('add_po_form').reset()
        setLoading(false)
    }

    return (
        <FormProvider {...methods}>
            <form id="add_po_form" onSubmit={methods.handleSubmit(onSubmit)}>
                <SelectInput
                    inputID="poVendor"
                    collection="vendor"
                    collectionKey="vendorName"
                    inputName="Vendor"
                    isRequired
                />
                <SelectInput
                    inputID="poProduct"
                    collection="product"
                    collectionKey="productName"
                    inputName="Product"
                    isRequired
                />
                <SimpleInput
                    inputID="poChequeNumber"
                    inputName="Cheque Number"
                    inputType="number"
                    isRequired
                />
                <DateInput
                    inputID="poChequeDate"
                    inputName="Cheque Date"
                    isRequired
                />
                <DateInput
                    inputID="poChequeDateReceived"
                    inputName="Cheque Date Received"
                    isRequired
                />
                <DateInput
                    inputID="poDeliveryDate"
                    inputName="Date of Delivery"
                    isRequired
                />
                <SimpleInput
                    inputID="poReceivedBy"
                    inputName="Received by"
                    inputType="text"
                    isRequired
                />
                <Button
                    text="Add Purchase Order"
                    loading={loading}
                    className=""
                />
            </form>
        </FormProvider>
    )
}

const TableContent = () => {
    const PurchaseOrdersContext = usePurchaseOrdersContext()
    const VendorsContext = useVendorsContext()
    const InventoryContext = useInventoryContext()

    const onChange = (id, field, value) =>
        PurchaseOrdersContext.updateOrder(id, field, value)

    return (
        <DataTable
            data={PurchaseOrdersContext.orders}
            columns={[
                {
                    title: 'vendor',
                    property: 'poVendor',
                    inputType: 'select',
                    selectData: VendorsContext.vendors.map((v) => ({
                        value: v.id,
                        text: v.vendorName,
                    })),
                },
                {
                    title: 'product',
                    property: 'poProduct',
                    inputType: 'select',
                    selectData: InventoryContext.products.map((p) => ({
                        value: p.id,
                        text: p.productName,
                    })),
                },
                { title: 'cheque #', property: 'poChequeNumber' },
                { title: 'date', property: 'poChequeDate' },
                { title: 'received', property: 'poChequeDateReceived' },
                { title: 'delivered', property: 'poDeliveryDate' },
                { title: 'received by', property: 'poReceivedBy' },
            ]}
            onChange={onChange}
        />
    )
}

const PurchaseOrdersPage = () => (
    <VendorsContextProvider>
        <InventoryContextProvider>
            <PurchaseOrdersContextProvider>
                <PurchaseOrdersContent />
            </PurchaseOrdersContextProvider>
        </InventoryContextProvider>
    </VendorsContextProvider>
)

export default PurchaseOrdersPage
