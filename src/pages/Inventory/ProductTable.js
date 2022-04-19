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
            titles={[
                'name',
                'price',
                'resell price',
                'markup',
                'quantity',
                'brand',
                'sku',
                'subcategory',
            ]}
            columns={[
                { property: 'productName' },
                { property: 'productPrice' },
                { property: 'productResellPrice' },
                { property: 'productMarkup' },
                { property: 'productQuantity' },
                { property: 'productBrand' },
                { property: 'productSKU' },
                { property: 'productSubcategory' },
            ]}
            onChange={onChange}
        />
    )
}

export default ProductTable
