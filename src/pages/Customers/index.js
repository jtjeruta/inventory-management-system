import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import AdminTabsLayout from '../../components/AdminTabsLayout'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'

const AdminPage = () => {
    const [tab, setTab] = useState(0)
    return (
        <AdminTabsLayout
            addButton="Add Customer"
            tableButton="Customers"
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
        customerName,
        customerContactNumber,
        customerEmail,
        customerAddress,
    }) => {
        setLoading(true)
        await standardAddMethod(
            'customer',
            {
                customerName,
                customerContactNumber,
                customerEmail,
                customerAddress,
            },
            'Customer',
            customerName
        )
        document.getElementById('add_customer_form').reset()
        setLoading(false)
    }

    return (
        <form id="add_customer_form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
                inputID="customerName"
                inputName="Name"
                inputType="text"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="customerContactNumber"
                inputName="Contact Number"
                inputType="number"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="customerEmail"
                inputName="email"
                inputType="email"
                isRequired={false}
                register={register}
            />
            <SimpleInput
                inputID="customerAddress"
                inputName="Address"
                inputType="text"
                isRequired
                register={register}
            />
            <Button text="Add Customer" loading={loading} className="" />
        </form>
    )
}
const Content2 = () => <>Content 2</>

export default AdminPage
