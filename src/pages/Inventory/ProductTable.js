import React from 'react'
import { useInventoryContext } from '../../contexts/InventoryContext'
import DataTable from '../../components/DataTable'

const ProductTable = () => {
    const InventoryContext = useInventoryContext()

    const onChange = (id, field, value) =>
        InventoryContext.updateProduct(id, field, value)

    return (
        <DataTable
            data={InventoryContext.products}
            columns={[
                { title: 'name', property: 'productName' },
                { title: 'price', property: 'productPrice' },
                { title: 'resell price', property: 'productResellPrice' },
                { title: 'markup', property: 'productMarkup' },
                { title: 'quantity', property: 'productQuantity' },
                { title: 'brand', property: 'productBrand' },
                { title: 'sku', property: 'productSKU' },
                { title: 'subcategory', property: 'productSubcategory' },
            ]}
            onChange={onChange}
        />
    )
}

export default ProductTable
