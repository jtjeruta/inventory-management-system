import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'

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
    const { soAdd } = useAuthContext()
    const onSubmit = async ({ soCustomer, soProduct, soRemarks }) => {
        setLoading(true)
        await soAdd(soCustomer, soProduct, soRemarks)
        document.getElementById('add_so_form').reset()
        setLoading(false)
    }

    return (
        <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top rounded-t-lg">
            <div>
                <div className="max-w-screen-md m-auto">
                    <form id="add_so_form" onSubmit={handleSubmit(onSubmit)}>
                        <SelectInput
                            inputID="soCustomer"
                            collection="customer"
                            collectionKey="customerName"
                            inputName="Name"
                            isRequired
                            register={register}
                        />
                        <SelectInput
                            inputID="soProduct"
                            collection="product"
                            collectionKey="productName"
                            inputName="Product"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="soRemarks"
                            inputName="Remarks"
                            inputType="text"
                            isRequired={false}
                            register={register}
                        />
                        <Button
                            text="Add Sale Order"
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
