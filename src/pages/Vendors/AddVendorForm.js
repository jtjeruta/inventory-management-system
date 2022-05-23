import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import { useVendorsContext } from '../../contexts/VendorsContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'

const AddVendorForm = () => {
    const methods = useForm()
    const [loading, setLoading] = useState(false)
    const { standardAddMethod } = useAuthContext()
    const VendorsContext = useVendorsContext()

    const onSubmit = async ({
        vendorName,
        vendorContactNumber,
        vendorEmail,
        vendorAddress,
    }) => {
        setLoading(true)
        const [success] = await standardAddMethod(
            'vendor',
            { vendorName, vendorContactNumber, vendorEmail, vendorAddress },
            'Vendor',
            vendorName
        )

        if (success) {
            document.getElementById('add_vendor_form').reset()
            VendorsContext.listVendors()
        }

        setLoading(false)
    }

    return (
        <FormProvider {...methods}>
            <form
                id="add_vendor_form"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <SimpleInput
                    inputID="vendorName"
                    inputName="Name"
                    inputType="text"
                    isRequired
                />
                <SimpleInput
                    inputID="vendorContactNumber"
                    inputName="Contact Number"
                    inputType="number"
                    isRequired
                />
                <SimpleInput
                    inputID="vendorEmail"
                    inputName="Email"
                    inputType="email"
                    isRequired={false}
                />
                <SimpleInput
                    inputID="vendorAddress"
                    inputName="Address"
                    inputType="text"
                    isRequired
                />
                <Button text="Add Vendor" loading={loading} className="" />
            </form>
        </FormProvider>
    )
}

export default AddVendorForm
