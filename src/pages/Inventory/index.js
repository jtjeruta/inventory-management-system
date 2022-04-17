import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faSpinner,
    faTimesCircle,
    faCheckCircle,
    faList,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../contexts/AuthContext'
import AdminTabsLayout from '../../components/AdminTabsLayout'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import SelectInput from '../../components/GeneralSelectInput'
import ProductTable from './ProductTable'
import {
    InventoryContextProvider,
    useInventoryContext,
} from '../../contexts/InventoryContext'

const InventoryPageContent = () => {
    const InventoryContext = useInventoryContext()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        InventoryContext.listProducts()
    }, [])

    return (
        <AdminTabsLayout
            addButton="Add Product"
            tableButton="Products"
            AddContent={<Content1 />}
            TableContent={<ProductTable />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const Content1 = () => {
    const { register, handleSubmit, watch } = useForm()
    const [loading, setLoading] = useState(false)
    const [loadingProductCategoryList, setLoadingProductCategoryList] =
        useState(false)
    const [loadingProductSubcategoryList, setLoadingProductSubcategoryList] =
        useState(false)
    const {
        standardAddMethod,
        standardUpdateMethod,
        uniqueAddMethod,
        getDocsOfCollection,
        updateStatus,
    } = useAuthContext()
    const [isAddModalActive, setActiveAddModal] = useState(false)
    const [isListModalActive, setActiveListModal] = useState(false)
    const [isStatusModalActive, setActiveStatusModal] = useState(false)
    const [categoryUpdateDetails, setCategoryUpdateDetails] = useState([])
    const [productCategoryList, setProductCategoryList] = useState([])
    const [productSubcategoryList, setProductSubcategoryList] = useState([])
    const [isSubcategory, setSubcategory] = useState(false)
    const [isEditing, setEditingState] = useState(false)
    const [isEditingSubcategory, setEditingSubcategory] = useState(false)
    const selectedCategory = watch('productCategory')
    const onSubmitProduct = async ({
        productName,
        productPrice,
        productResellPrice,
        productMarkup,
        productQuantity,
        productSKU,
        productBrand,
        productSubcategory,
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
                productSubcategory,
            },
            'Product',
            productName
        )
        document.getElementById('add_product_form').reset()
        setLoading(false)
    }
    const getProductCategoryList = async () => {
        setLoadingProductCategoryList(true)
        setProductCategoryList(
            await getDocsOfCollection('productCategory').then((data) => {
                const temp = []
                const iconStyle =
                    'text-green-600 basis-1/12 hover:text-green-800'
                data.forEach((key) => {
                    const tempMap = key[1]
                    const tempId = key[0]
                    temp.push(
                        <li
                            id={tempId}
                            key={tempId}
                            className={`${
                                tempMap.isEnabled ? null : 'bg-gray-300'
                            } border-cyan-500 border-solid border-x-0 border-t-0 border-b-2 text-lg p-2 flex flex-row select-none`}
                        >
                            <span className="basis-9/12">
                                {tempMap.productCategoryName}
                            </span>

                            <FontAwesomeIcon
                                icon={faPen}
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setCategoryUpdateDetails([
                                        tempId,
                                        tempMap.productCategoryName,
                                        tempMap.isEnabled,
                                    ])
                                    setEditingState(true)
                                    setSubcategory(false)
                                    setEditingSubcategory(false)
                                    setActiveAddModal(true)
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faList}
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setSubcategory([
                                        tempId,
                                        tempMap.productCategoryName,
                                    ])
                                }}
                            />
                            <FontAwesomeIcon
                                icon={
                                    tempMap.isEnabled
                                        ? faTimesCircle
                                        : faCheckCircle
                                }
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setCategoryUpdateDetails([
                                        tempId,
                                        tempMap.productCategoryName,
                                        !tempMap.isEnabled,
                                    ])
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

    const getProductSubcategoryList = async () => {
        setLoadingProductSubcategoryList(true)
        setProductSubcategoryList(
            await getDocsOfCollection(
                'productSubcategory',
                null,
                'productSubcategoryCategory',
                isSubcategory[0]
            ).then((data) => {
                const temp = []
                const iconStyle =
                    'text-green-600 basis-1/12 hover:text-green-800'
                data.forEach((key) => {
                    const tempMap = key[1]
                    const tempId = key[0]
                    temp.push(
                        <li
                            id={tempId}
                            key={tempId}
                            className={`${
                                tempMap.isEnabled ? null : 'bg-gray-300'
                            } border-cyan-500 border-solid border-x-0 border-t-0 border-b-2 text-lg p-2 flex flex-row select-none`}
                        >
                            <span className="basis-10/12">
                                {tempMap.productSubcategoryName}
                            </span>

                            <FontAwesomeIcon
                                icon={faPen}
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setCategoryUpdateDetails([
                                        tempId,
                                        tempMap.productSubcategoryName,
                                        tempMap.isEnabled,
                                        tempMap.productSubcategoryCategory,
                                    ])
                                    setEditingSubcategory(true)
                                    setActiveAddModal(true)
                                }}
                            />
                            <FontAwesomeIcon
                                icon={
                                    tempMap.isEnabled
                                        ? faTimesCircle
                                        : faCheckCircle
                                }
                                className={iconStyle}
                                role="button"
                                onClick={() => {
                                    setCategoryUpdateDetails([
                                        tempId,
                                        tempMap.productSubcategoryName,
                                        !tempMap.isEnabled,
                                        tempMap.productSubcategoryCategory,
                                    ])
                                    setEditingSubcategory(true)
                                    setActiveStatusModal(true)
                                }}
                            />
                        </li>
                    )
                })
                return temp
            })
        )
        setLoadingProductSubcategoryList(false)
    }

    const onSubmitProductCategory = async ({ productCategoryName }) => {
        setLoading(true)
        const tempChecker = productCategoryName.toLowerCase()
        await uniqueAddMethod(
            'productCategory',
            {
                productCategoryName,
                productCategoryNameChecker: tempChecker,
                isEnabled: true,
            },
            'productCategoryNameChecker',
            tempChecker,
            'Product Category',
            productCategoryName
        )
        document.getElementById('add_product_category_form').reset()
        setActiveAddModal(false)
        setLoading(false)
    }
    const onSubmitProductSubcategory = async ({ productCategoryName }) => {
        setLoading(true)
        const tempChecker = productCategoryName.toLowerCase()
        await uniqueAddMethod(
            'productSubcategory',
            {
                productSubcategoryName: productCategoryName,
                productSubcategoryNameChecker: tempChecker,
                productSubcategoryCategory: isSubcategory[0],
                isEnabled: true,
            },
            'productSubcategoryNameChecker',
            tempChecker,
            'Product Subcategory',
            productCategoryName
        )
        document.getElementById('add_product_category_form').reset()
        setActiveAddModal(false)
        getProductSubcategoryList()
        setLoading(false)
    }
    const onSubmitProductCategoryUpdate = async ({ productCategoryName }) => {
        setLoading(true)
        let tempName = productCategoryName
        if (tempName === '' && categoryUpdateDetails.length > 0) {
            ;[, tempName] = categoryUpdateDetails
        }
        await standardUpdateMethod(
            'productCategory',
            categoryUpdateDetails[0],
            {
                productCategoryName: tempName,
                productCategoryNameChecker: tempName.toLowerCase(),
            },
            'Product Category',
            tempName
        )
        document.getElementById('add_product_category_form').reset()
        setActiveAddModal(false)
        getProductCategoryList()
        setLoading(false)
    }
    const onSubmitProductSubcategoryUpdate = async ({
        productCategoryName,
    }) => {
        setLoading(true)
        let tempName = productCategoryName
        if (tempName === '' && categoryUpdateDetails.length > 0) {
            ;[, tempName] = categoryUpdateDetails
        }
        await standardUpdateMethod(
            'productSubcategory',
            categoryUpdateDetails[0],
            {
                productSubcategoryName: tempName,
                productSubcategoryNameChecker: tempName.toLowerCase(),
            },
            'Product Subcategory',
            tempName
        )
        document.getElementById('add_product_category_form').reset()
        setActiveAddModal(false)
        getProductSubcategoryList()
        setLoading(false)
    }
    const onConfirmStatusChange = async () => {
        setLoading(true)
        await updateStatus(
            'productCategory',
            categoryUpdateDetails[0],
            categoryUpdateDetails[1],
            categoryUpdateDetails[2]
        )
        setActiveStatusModal(false)
        getProductCategoryList()
        setLoading(false)
    }
    const onConfirmStatusChangeSubcategory = async () => {
        setLoading(true)
        await updateStatus(
            'productSubcategory',
            categoryUpdateDetails[0],
            categoryUpdateDetails[1],
            categoryUpdateDetails[2]
        )
        setActiveStatusModal(false)
        getProductSubcategoryList()
        setLoading(false)
    }
    useEffect(() => {
        if (isListModalActive) {
            getProductCategoryList()
        }
    }, [isListModalActive])

    useEffect(() => {
        if (isSubcategory) {
            getProductSubcategoryList()
        }
    }, [isSubcategory])

    return (
        <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top rounded-t-lg">
            <div>
                <div className="bg-transparent w-full mt-2 p-2 align-top flex flex-row-reverse">
                    <button
                        className="p-2 mx-2 rounded-lg bg-green-600 text-gray-100"
                        onClick={() => {
                            setSubcategory(false)
                            setActiveListModal(true)
                        }}
                    >
                        View Category List
                    </button>
                    <button
                        className="p-2 rounded-lg bg-green-600 text-gray-100"
                        onClick={() => {
                            setEditingState(false)
                            setEditingSubcategory(false)
                            setSubcategory(false)
                            setActiveAddModal(true)
                        }}
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
                        <SelectInput
                            inputID="productCategory"
                            collection="productCategory"
                            collectionKey="productCategoryName"
                            inputName="Category"
                            isRequired={false}
                            register={register}
                            optionKey="isEnabled"
                            optionValue
                        />
                        <SelectInput
                            inputID="productSubcategory"
                            collection="productSubcategory"
                            collectionKey="productSubcategoryName"
                            inputName="Subcategory"
                            isRequired={selectedCategory}
                            register={register}
                            optionKey={[
                                'productSubcategoryCategory',
                                'isEnabled',
                            ]}
                            optionValue={[selectedCategory, true]}
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
                } justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 pt-20 ${
                    isEditing || isSubcategory || isEditingSubcategory
                        ? 'z-[60] '
                        : ' z-50 '
                } outline-none focus:outline-none`}
                style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
            >
                <div
                    className={`${
                        isAddModalActive
                            ? 'opacity-50 visible'
                            : 'opacity-0 invisible'
                    } fixed inset-0 bg-black select-none`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveAddModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl h-min">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t select-none">
                            <h3 className="text-3xl font-semibold">
                                {(() => {
                                    if (isEditingSubcategory) {
                                        return `Updating ${categoryUpdateDetails[1]} Subcategory`
                                    }
                                    if (isEditing) {
                                        return `Updating ${categoryUpdateDetails[1]} Category`
                                    }
                                    if (isSubcategory) {
                                        return `Add Subcategory for ${isSubcategory[1]}`
                                    }
                                    return 'Add Product Category'
                                })()}
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
                                onSubmit={(() => {
                                    if (isEditingSubcategory) {
                                        return handleSubmit(
                                            onSubmitProductSubcategoryUpdate
                                        )
                                    }
                                    if (isEditing) {
                                        return handleSubmit(
                                            onSubmitProductCategoryUpdate
                                        )
                                    }
                                    if (isSubcategory) {
                                        return handleSubmit(
                                            onSubmitProductSubcategory
                                        )
                                    }
                                    return handleSubmit(onSubmitProductCategory)
                                })()}
                            >
                                <SimpleInput
                                    inputID="productCategoryName"
                                    inputName={`Name of 
                                        ${
                                            isSubcategory
                                                ? 'Subcategory'
                                                : 'Category'
                                        }`}
                                    inputType="text"
                                    isRequired
                                    register={register}
                                    defaultValue={
                                        isEditing || isEditingSubcategory
                                            ? categoryUpdateDetails[1]
                                            : undefined
                                    }
                                />
                                <Button
                                    text={(() => {
                                        if (isEditingSubcategory) {
                                            return `Update Subcategory`
                                        }
                                        if (isEditing) {
                                            return 'Update Product Category'
                                        }
                                        if (isSubcategory) {
                                            return 'Add Product Subcategory'
                                        }
                                        return 'Add Product Category'
                                    })()}
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
                    } fixed inset-0 bg-black select-none`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveListModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
                    {loadingProductSubcategoryList && (
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
                    {isSubcategory ? (
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold select-none">
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        role="button"
                                        className="text-green-600 basis-1/12 hover:text-green-800 text-lg"
                                        onClick={() => {
                                            setSubcategory(false)
                                        }}
                                    />
                                    &nbsp;&nbsp; {isSubcategory[1]} Subcategory
                                    List
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setActiveListModal(false)
                                    }}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none select-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/* body */}
                            <div className="w-full flex flex-row-reverse p-5">
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-1 my-1 ease-linear transition-all duration-150 w-min select-none"
                                    onClick={() => {
                                        setEditingState(false)
                                        setEditingSubcategory(false)
                                        setActiveAddModal(true)
                                    }}
                                >
                                    Add&nbsp;Subcategory
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto select-none">
                                {loadingProductSubcategoryList && (
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
                                {!loadingProductSubcategoryList && (
                                    <ul>{productSubcategoryList}</ul>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold select-none">
                                    Category List
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setActiveListModal(false)}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none select-none">
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
                                {!loadingProductCategoryList && (
                                    <ul>{productCategoryList}</ul>
                                )}
                            </div>
                        </div>
                    )}
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
                    } fixed inset-0 bg-black select-none`}
                    style={{ transition: 'opacity 0.25s, visibility 0.25s' }}
                    onClick={() => setActiveStatusModal(false)}
                />
                <div className="relative w-3/6 my-6 mx-auto max-w-3xl h-min">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {`${
                                    categoryUpdateDetails[2]
                                        ? 'Enable'
                                        : 'Disable'
                                } ${
                                    isEditingSubcategory
                                        ? 'Subcategory'
                                        : 'Category'
                                }`}
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
                            Are you sure you want to{' '}
                            {`${
                                categoryUpdateDetails[2] ? 'enable' : 'disable'
                            } the `}
                            <span className="font-semibold">
                                {categoryUpdateDetails[1]}
                            </span>
                            &nbsp;
                            {`${
                                isEditingSubcategory
                                    ? 'subcategory'
                                    : 'category'
                            }?`}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    isEditingSubcategory
                                        ? onConfirmStatusChangeSubcategory()
                                        : onConfirmStatusChange()
                                }}
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

const InventoryPage = () => (
    <InventoryContextProvider>
        <InventoryPageContent />
    </InventoryContextProvider>
)
export default InventoryPage
