import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useAuthContext } from '../../contexts/AuthContext'
import { useInventoryContext } from '../../contexts/InventoryContext'
import Button from '../../components/SubmitButton'
import SimpleInput from '../../components/GeneralInput'
import { generateSKU } from '../../utils'

const AddProductForm = () => {
    const { standardAddMethod } = useAuthContext()
    const { products, listProducts } = useInventoryContext()
    const methods = useForm()
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
        await listProducts()
        document.getElementById('add_product_form').reset()
        setLoading(false)
    }

    return (
        <FormProvider {...methods}>
            <form
                id="add_product_form"
                onSubmit={methods.handleSubmit(onSubmitProduct)}
            >
                <SimpleInput
                    inputID="name"
                    inputName="Name of Product"
                    isRequired
                />
                <SimpleInput
                    inputID="price"
                    inputName="Resell Price"
                    inputType="number"
                    isRequired
                />
                <SimpleInput
                    inputID="brand"
                    inputName="Brand Name"
                    isRequired
                    autoCompleteOptions={products.reduce(
                        (acc, product) =>
                            acc.includes(product)
                                ? acc
                                : [...acc, product.brand],
                        []
                    )}
                />
                <SimpleInput
                    inputID="category"
                    inputName="Category"
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
        </FormProvider>
    )
}

export default AddProductForm
