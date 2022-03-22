import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'

const AdminPage = () => {
    const [contentState, setContentState] = useState(1)
    const setContent1 = () => setContentState(1)
    const setContent2 = () => setContentState(2)
    return (
        <div>
            <div className="w-full h-full bg-slate-300 flex flex-row">
                <div className="">
                    <button
                        className="block box-border h-32 w-32 bg-cyan-500 mt-16 ml-10 py-10 px-10 font-semibold rounded-l-lg"
                        onClick={setContent1}
                    >
                        Add shit
                    </button>
                    <button
                        className="block box-border h-32 w-32 bg-teal-500 my-2 ml-10 py-10 px-10 font-semibold rounded-l-lg"
                        onClick={setContent2}
                    >
                        Spread sheet
                    </button>
                </div>
                {contentState === 1 ? <Content1 /> : <Content2 />}
            </div>
        </div>
    )
}

const Content1 = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const { customerAdd } = useAuthContext()
    const onSubmit = async ({
        customerName,
        customerContactNumber,
        customerEmail,
        customerAddress,
    }) => {
        setLoading(true)
        const response = await customerAdd(
            customerName,
            customerContactNumber,
            customerEmail,
            customerAddress
        )
        document.getElementById('add_customer_form').reset()
        setLoading(false)
    }

    return (
        <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top rounded-t-lg">
            <div>
                <div className="max-w-screen-md m-auto">
                    <form
                        id="add_customer_form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                        <Button
                            text="Add Customer"
                            loading={loading}
                            className=""
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
const Content2 = () => (
    <div className="inline-block bg-teal-500 h-screen w-10/12 mt-8 align-top rounded-t-lg text-center">
        Content 2
    </div>
)

export default AdminPage
