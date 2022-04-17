import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'

const AddVendorForm = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const { standardAddMethod } = useAuthContext()
    const onSubmit = async ({
        vendorName,
        vendorContactNumber,
        vendorEmail,
        vendorAddress,
    }) => {
        setLoading(true)
        await standardAddMethod(
            'vendor',
            { vendorName, vendorContactNumber, vendorEmail, vendorAddress },
            'Vendor',
            vendorName
        )
        document.getElementById('add_vendor_form').reset()
        setLoading(false)
    }

    return (
        <form id="add_vendor_form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
                inputID="vendorName"
                inputName="Name"
                inputType="text"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="vendorContactNumber"
                inputName="Contact Number"
                inputType="number"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="vendorEmail"
                inputName="email"
                inputType="email"
                isRequired={false}
                register={register}
            />
            <SimpleInput
                inputID="vendorAddress"
                inputName="Address"
                inputType="text"
                isRequired
                register={register}
            />
            <Button text="Add Vendor" loading={loading} className="" />
        </form>
    )
}

export default AddVendorForm
