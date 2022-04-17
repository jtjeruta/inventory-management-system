import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminTabsLayout from '../../components/AdminTabsLayout'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'
import DateInput from '../../components/GeneralDateInput'

const AdminPage = () => {
    const [tab, setTab] = useState(0)
    return (
        <AdminTabsLayout
            addButton="Add Order"
            tableButton="Orders"
            AddContent={<Content1 />}
            TableContent={<Content2 />}
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
                inputName="Name"
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
const Content2 = () => <>Content 2</>

export default AdminPage
