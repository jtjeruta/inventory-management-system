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
                { property: 'productName', editable: true },
                { property: 'productPrice', editable: true },
                { property: 'productResellPrice', editable: true },
                { property: 'productMarkup', editable: true },
                { property: 'productQuantity', editable: true },
                { property: 'productBrand', editable: true },
                { property: 'productSKU', editable: true },
                { property: 'productSubcategory', editable: true },
            ]}
            onChange={onChange}
        />
    )
}

export default ProductTable
