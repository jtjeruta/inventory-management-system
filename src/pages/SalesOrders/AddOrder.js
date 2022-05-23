import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'

const AddOrder = () => {
    const methods = useForm()
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
        <FormProvider {...methods}>
            <form id="add_so_form" onSubmit={methods.handleSubmit(onSubmit)}>
                <SelectInput
                    inputID="soCustomer"
                    collection="customer"
                    collectionKey="customerName"
                    inputName="Customer"
                    isRequired
                />
                <SelectInput
                    inputID="soProduct"
                    collection="product"
                    collectionKey="productName"
                    inputName="Product"
                    isRequired
                />
                <SimpleInput
                    inputID="soRemarks"
                    inputName="Remarks"
                    inputType="text"
                    isRequired={false}
                />
                <Button text="Add Order" loading={loading} className="" />
            </form>
        </FormProvider>
    )
}

export default AddOrder
