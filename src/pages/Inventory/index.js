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
    const { productAdd } = useAuthContext()
    const onSubmit = async ({
        productName,
        productCost,
        productResellPrice,
        productMarkup,
    }) => {
        setLoading(true)
        const response = await productAdd(
            productName,
            productCost,
            productResellPrice,
            productMarkup
        )
        document.getElementById('add_product_form').reset()
        setLoading(false)
    }

    return (
        <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top rounded-t-lg">
            <div>
                <div className="max-w-screen-md m-auto">
                    <form
                        id="add_product_form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <SimpleInput
                            inputID="productName"
                            inputName="Name of Product"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productCost"
                            inputName="Cost of Product"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productResellPrice"
                            inputName="Resell Price"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productMarkup"
                            inputName="Markup (Interest)"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <Button
                            text="Add Product"
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
