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
                {
                    title: 'created',
                    property: 'createdAt',
                    format: (val) => val.toDate().toLocaleDateString(),
                    editable: false,
                },
                { title: 'name', property: 'name' },
                // TODO: need to calculate ave price based on purchase orders
                {
                    title: 'ave. price',
                    property: 'avePrice',
                    editable: false,
                    format: () => 145.0,
                },
                // TODO: need to calculate markup based on resell price and ave price
                {
                    title: 'markup',
                    property: 'markup',
                    editable: false,
                    format: () => '15%',
                },
                { title: 'brand', property: 'brand' },
                { title: 'sku', property: 'sku', editable: false },
                { title: 'category', property: 'category' },
                // TODO: need to retrieve how much of product units are still in the warehouse
                {
                    title: 'warehouse qty',
                    property: 'warehouseQty',
                    editable: false,
                    format: () => 100,
                },
                // TODO: need to retrieve how much of product units are in the store
                {
                    title: 'store qty',
                    property: 'storeQty',
                    editable: false,
                    format: () => 50,
                },
            ]}
            onChange={onChange}
        />
    )
}

export default ProductTable
