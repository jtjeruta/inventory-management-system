import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
