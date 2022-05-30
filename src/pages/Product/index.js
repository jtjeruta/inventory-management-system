import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import History from './History'
import ProductForm from './ProductForm'
import Variants from './Variants'
import Details from './Details'

const CustomerPage = ({ breadcrumbs }) => {
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
