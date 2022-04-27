import React from 'react'
import { useSalesOrdersContext } from '../../contexts/SalesOrdersContext'
import { useCustomersContext } from '../../contexts/CustomersContext'
import { useInventoryContext } from '../../contexts/InventoryContext'
import DataTable from '../../components/DataTable'

const SalesOrdersTable = () => {
    const SalesOrdersContext = useSalesOrdersContext()
    const CustomersContext = useCustomersContext()
    const InventoryContext = useInventoryContext()

    const onChange = (id, field, value) =>
        SalesOrdersContext.updateOrder(id, field, value)

    return (
        <DataTable
            data={SalesOrdersContext.orders}
            columns={[
                {
                    title: 'customer',
                    property: 'soCustomer',
                    inputType: 'select',
                    selectData: CustomersContext.customers.map((c) => ({
                        value: c.id,
                        text: c.customerName,
                    })),
                },
                {
                    title: 'product',
                    property: 'soProduct',
                    inputType: 'select',
                    selectData: InventoryContext.products.map((p) => ({
                        value: p.id,
                        text: p.productName,
                    })),
                },
                { title: 'remarks', property: 'soRemarks' },
                {
                    title: 'date',
                    property: 'soDate',
                    format: (value) => value.toDate().toLocaleString(),
                },
            ]}
            onChange={onChange}
        />
    )
}

export default SalesOrdersTable
