import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import History from './History'
import ProductForm from './ProductForm'
import Variants from './Variants'
import Details from './Details'
import { useInventoryContext } from '../../contexts/InventoryContext'

const CustomerPage = ({ breadcrumbs }) => {
    const { selectedProduct, getProduct } = useInventoryContext()
    const params = useParams()

    useEffect(() => {
        if (selectedProduct?.id !== params.productId) {
            getProduct(params.productId)
        }
    }, [])

    return (
        <div className="w-full flex flex-col gap-4">
            <Breadcrumbs links={breadcrumbs} />
            <div className="flex gap-4">
                <ProductForm />
                <Variants />
            </div>
            <Details />
            <History />
        </div>
    )
}

export default CustomerPage
