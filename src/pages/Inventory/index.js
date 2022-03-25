import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'
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
    const [loadingProductCategoryList, setLoadingProductCategoryList] =
        useState(false)
    const {
        standardAddMethod,
        productCategoryAdd,
        getDocsOfCollection,
        updateStatus,
    } = useAuthContext()
    const [isAddModalActive, setActiveAddModal] = useState(false)
    const [isListModalActive, setActiveListModal] = useState(false)
    const [isStatusModalActive, setActiveStatusModal] = useState(false)
    const [toBeDisabled, setToBeDisabled] = useState([])
    const [productCategoryList, setProductCategoryList] = useState([])
    const onSubmitProduct = async ({
        productName,
        productPrice,
        productResellPrice,
        productMarkup,
        productQuantity,
        productSKU,
        productBrand,
    }) => {
        setLoading(true)
        await standardAddMethod(
            'product',
            {
                productName,
                productPrice,
                productResellPrice,
                productMarkup,
                productQuantity,
                productSKU,
                productBrand,
            },
            'Product',
            productName
        )
        document.getElementById('add_product_form').reset()
        setLoading(false)
    }
    const onSubmitProductCategory = async ({ productCategoryName }) => {
        setLoading(true)
        await productCategoryAdd(productCategoryName)
        document.getElementById('add_product_category_form').reset()
        setActiveAddModal(false)
        setLoading(false)
    }
    const getProductList = async () => {
        setLoadingProductCategoryList(true)
        setProductCategoryList(
            await getDocsOfCollection(
                'productCategory',
                'productCategoryName'
            ).then((data) => {
                let temp = []
                let iconStyle = 'text-green-600 basis-1/12 hover:text-green-800'
                data.forEach((key) => {
                    temp.push(
                        <li
                            id={key[0]}
                            key={key[0]}
                            className="border-cyan-500 border-solid border-x-0 border-t-0 border-b-2 text-lg py-2 flex flex-row"
                        >
                            <span className="basis-10/12">{key[1]}</span>
                            <FontAwesomeIcon
                                icon={faPen}
                                className={iconStyle}
                                role="button"
                                onClick={() => alert('imong mama')}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setToBeDisabled([key[0], key[1], false])
                                    setActiveStatusModal(true)
                                }}
                            />
                        </li>
                    )
                })
                return temp
            })
        )
        setLoadingProductCategoryList(false)
    }
    const onConfirmStatusChange = async () => {
        setLoading(true)
        await updateStatus(
            'productCategory',
            toBeDisabled[0],
            toBeDisabled[1],
            toBeDisabled[2]
        )
        setActiveStatusModal(false)
        setLoading(false)
    }
    useEffect(() => {
        if (isListModalActive) {
            getProductList()
        }
    }, [isListModalActive])

    return (
        <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top rounded-t-lg">
            <div>
                <div className="bg-transparent w-full mt-2 p-2 align-top flex flex-row-reverse">
                    <button
                        className="p-2 mx-2 rounded-lg bg-green-600 text-gray-100 float-right"
                        onClick={() => setActiveListModal(true)}
                    >
                        View Category List
                    </button>
                    <button
                        className="p-2 rounded-lg bg-green-600 text-gray-100 float-right"
                        onClick={() => setActiveAddModal(true)}
                    >
                        Add Category
                    </button>
                </div>
                <div className="max-w-screen-md m-auto">
                    <form
                        id="add_product_form"
                        onSubmit={handleSubmit(onSubmitProduct)}
                    >
                        <SimpleInput
                            inputID="productName"
                            inputName="Name of Product"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productPrice"
                            inputName="Price of Product"
                            inputType="text"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productResellPrice"
                            inputName="Resell Price"
                            inputType="text"
                            isRequired={false}
                            register={register}
                        />
                        <SimpleInput
                            inputID="productMarkup"
                            inputName="Markup (Interest)"
                            inputType="text"
                            isRequired={false}
                            register={register}
                        />
                        <SimpleInput
                            inputID="productQuantity"
                            inputName="Quantity"
                            inputType="number"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productSKU"
                            inputName="SKU"
                            inputType="number"
                            isRequired
                            register={register}
                        />
                        <SimpleInput
                            inputID="productBrand"
                            inputName="Brand Name"
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
            <div
                className={`${
                    isAddModalActive
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
            >
                <div
                    className={`${
                        isAddModalActive
                            ? 'opacity-50 visible'
                            : 'opacity-0 invisible'
                    } fixed inset-0 bg-black`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveAddModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add Product Category
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setActiveAddModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* body */}
                        <div className="relative p-6 flex-auto">
                            <form
                                id="add_product_category_form"
                                onSubmit={handleSubmit(onSubmitProductCategory)}
                            >
                                <SimpleInput
                                    inputID="productCategoryName"
                                    inputName="Name of Category"
                                    inputType="text"
                                    isRequired
                                    register={register}
                                />
                                <Button
                                    text="Add Product Category"
                                    loading={loading}
                                    className=""
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isListModalActive
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
            >
                <div
                    className={`${
                        isListModalActive
                            ? 'opacity-50 visible'
                            : 'opacity-0 invisible'
                    } fixed inset-0 bg-black`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveListModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Category List
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setActiveListModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* body */}
                        <div className="relative p-6 flex-auto">
                            {loadingProductCategoryList && (
                                <center>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="animate-spin text-xl"
                                        style={{
                                            marginRight: 10,
                                            marginLeft: -26,
                                        }}
                                    />
                                </center>
                            )}
                            {isListModalActive && (
                                <ul>{productCategoryList}</ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isStatusModalActive
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                } justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none`}
                style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
            >
                <div
                    className={`${
                        isStatusModalActive
                            ? 'opacity-50 visible'
                            : 'opacity-0 invisible'
                    } fixed inset-0 bg-black`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveStatusModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Disable Category
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setActiveStatusModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* body */}
                        <div className="relative p-6 flex-auto text-lg">
                            Are you sure you want to disable the{' '}
                            <span className="font-semibold">
                                {toBeDisabled[1]}
                            </span>{' '}
                            category?
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => onConfirmStatusChange()}
                            >
                                {loading && (
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="animate-spin"
                                        style={{
                                            marginRight: 10,
                                            marginLeft: -26,
                                        }}
                                    />
                                )}
                                Confirm
                            </button>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setActiveStatusModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
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
