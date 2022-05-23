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
                // { title: 'average price', property: 'avePrice' }, TODO: need to calculate ave price based on purchase orders
                // { title: 'markup', property: 'markup' }, TODO: need to calculate markup based on resell price and ave price
                { title: 'brand', property: 'brand' },
                { title: 'sku', property: 'sku', editable: false },
                { title: 'category', property: 'category' },
                // { title: 'warehouse qty', property: 'warehouseQty' }, TODO: need to retrieve how much of product units are still in the warehouse
                // { title: 'store qty', property: 'storeQty' }, TODO: need to retrieve how much of product units are in the store
            ]}
            onChange={onChange}
        />
    )
}

export default ProductTable
