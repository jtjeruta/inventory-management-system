import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdminTabsLayout from '../../components/AdminTabsLayout'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'
import DateInput from '../../components/GeneralDateInput'
import {
    PurchaseOrdersContextProvider,
    usePurchaseOrdersContext,
} from '../../contexts/PurchaseOrdersContext'
import DataTable from '../../components/DataTable'

const PurchaseOrdersContent = () => {
    const PurchaseOrdersContext = usePurchaseOrdersContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        PurchaseOrdersContext.listOrders()
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
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const { standardAddMethod } = useAuthContext()
    const onSubmit = async ({
        poVendor,
        poProduct,
        poChequeNumber,
        poChequeDate,
        poChequeDateReceived,
        poDeliveryDate,
        poReceivedBy,
    }) => {
        setLoading(true)
        await standardAddMethod(
            'purchaseOrder',
            {
                poVendor,
                poProduct,
                poChequeNumber,
                poChequeDate,
                poChequeDateReceived,
                poDeliveryDate,
                poReceivedBy,
            },
            'Product Order'
        )
        document.getElementById('add_po_form').reset()
        setLoading(false)
    }

    return (
        <form id="add_po_form" onSubmit={handleSubmit(onSubmit)}>
            <SelectInput
                inputID="poVendor"
                collection="vendor"
                collectionKey="vendorName"
                inputName="Vendor"
                isRequired
                register={register}
            />
            <SelectInput
                inputID="poProduct"
                collection="product"
                collectionKey="productName"
                inputName="Product"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="poChequeNumber"
                inputName="Cheque Number"
                inputType="number"
                isRequired
                register={register}
            />
            <DateInput
                inputID="poChequeDate"
                inputName="Cheque Date"
                isRequired
                register={register}
            />
            <DateInput
                inputID="poChequeDateReceived"
                inputName="Cheque Date Received"
                isRequired
                register={register}
            />
            <DateInput
                inputID="poDeliveryDate"
                inputName="Date of Delivery"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="poReceivedBy"
                inputName="Received by"
                inputType="text"
                isRequired
                register={register}
            />
            <Button text="Add Purchase Order" loading={loading} className="" />
        </form>
    )
}

const TableContent = () => {
    const PurchaseOrdersContext = usePurchaseOrdersContext()

    const onChange = (id, field, value) =>
        PurchaseOrdersContext.updateOrder(id, field, value)

    return (
        <DataTable
            data={PurchaseOrdersContext.orders}
            titles={[
                'Vendor',
                'Product',
                'Cheque Number',
                'Date',
                'Received',
                'Delivered',
                'Received by',
            ]}
            columns={[
                { property: 'poVendor', editable: true },
                { property: 'poProduct', editable: true },
                { property: 'poChequeNumber', editable: true },
                { property: 'poChequeDate', editable: true },
                { property: 'poChequeDateReceived', editable: true },
                { property: 'poDeliveryDate', editable: true },
                { property: 'poReceivedBy', editable: true },
            ]}
            onChange={onChange}
        />
    )
}

const PurchaseOrdersPage = () => (
    <PurchaseOrdersContextProvider>
        <PurchaseOrdersContent />
    </PurchaseOrdersContextProvider>
)

export default PurchaseOrdersPage
