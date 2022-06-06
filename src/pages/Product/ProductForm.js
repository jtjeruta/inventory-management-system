import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Card from '../../components/Card'
import FormButton from '../../components/FormButton'
import InputField2 from '../../components/InputField2'
import { useAppContext } from '../../contexts/AppContext'
import { useInventoryContext } from '../../contexts/InventoryContext'

const ProductForm = () => {
    const methods = useForm()
    const { isLoading } = useAppContext()
    const { selectedProduct, updateProduct } = useInventoryContext()

    const onSubmit = async (values) => {
        const formattedValues = {
            ...values,
            price: +values.price,
        }

        selectedProduct?.id &&
            updateProduct(selectedProduct.id, formattedValues)
    }

    return (
        <Card className="grow basis-0">
            {isLoading('get-product') || !selectedProduct ? (
                <h1>Loading</h1>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <InputField2
                                name="name"
                                label="Name"
                                defaultValue={selectedProduct?.name}
                                placeholder="Product 1"
                                required
                            />
                        </div>
                        <div className="grid gap-6 mb-6 lg:grid-cols-2">
                            <InputField2
                                name="price"
                                label="Resell Price"
                                defaultValue={selectedProduct?.price}
                                placeholder="100.00"
                                required
                            />
                            <InputField2
                                name="brand"
                                label="Brand"
                                defaultValue={selectedProduct?.brand}
                                placeholder="Brand 1"
                                required
                            />
                            <InputField2
                                name="category"
                                label="Category"
                                defaultValue={selectedProduct?.category}
                                placeholder="category 1"
                                required
                            />
                            <InputField2
                                name="subCategory"
                                label="Sub Category"
                                defaultValue={selectedProduct?.subCategory}
                                placeholder="sub category 1"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <FormButton>Update</FormButton>
                        </div>
                    </form>
                </FormProvider>
            )}
        </Card>
    )
}

export default ProductForm
