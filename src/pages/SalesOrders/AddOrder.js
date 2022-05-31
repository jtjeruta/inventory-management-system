import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import RemarksForm from './RemarksForm'
import BalanceForm from './BalanceForm'
import CustomerForm from './CustomerForm'
import ProductSelectionForm from './ProductSelectionForm'

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
        document.getElementById('soTotalPriceShowcase').innerHTML = 0
        setLoading(false)
    }

    return (
        <FormProvider {...methods}>
            <form id="add_so_form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-4 mt-5">
                    <CustomerForm />
                    <ProductSelectionForm />
                    <div className="flex gap-4">
                        <RemarksForm className="w-3/4" />
                        <BalanceForm className="w-1/4" />
                    </div>
                </div>
                <Button className="mt-5" text="Add Order" loading={loading} />
            </form>
        </FormProvider>
    )
}

export default AddOrder
