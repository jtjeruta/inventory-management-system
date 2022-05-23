import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '../../contexts/AuthContext'
import { useInventoryContext } from '../../contexts/InventoryContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import { generateSKU } from '../../utils'

const AddProductForm = () => {
    const { standardAddMethod } = useAuthContext()
    const { products } = useInventoryContext()
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmitProduct = async ({ price, ...values }) => {
        const data = {
            ...values,
            price: +price,
            createdAt: new Date(),
            modifiedAt: new Date(),
            sku: generateSKU(),
        }

        setLoading(true)
        await standardAddMethod('product', data, 'Product', data.name)
        document.getElementById('add_product_form').reset()
        setLoading(false)
    }

    return (
        <form id="add_product_form" onSubmit={handleSubmit(onSubmitProduct)}>
            <SimpleInput
                inputID="name"
                inputName="Name of Product"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="price"
                inputName="Resell Price"
                inputType="number"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="brand"
                inputName="Brand Name"
                isRequired
                register={register}
            />
            <SimpleInput
                inputID="category"
                inputName="Category"
                register={register}
                autoCompleteOptions={products.reduce(
                    (acc, product) =>
                        acc.includes(product)
                            ? acc
                            : [...acc, product.category],
                    []
                )}
            />
            <SimpleInput
                inputID="subCategory"
                inputName="Sub-Category"
                register={register}
                autoCompleteOptions={products.reduce(
                    (acc, product) =>
                        acc.includes(product)
                            ? acc
                            : [...acc, product.subCategory],
                    []
                )}
            />
            <Button text="Add Product" loading={loading} className="" />
        </form>
    )
}

export default AddProductForm
