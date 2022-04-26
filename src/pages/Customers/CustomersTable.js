import React from 'react'
import { useCustomersContext } from '../../contexts/CustomersContext'
import DataTable from '../../components/DataTable'

const CustomersTable = () => {
    const CustomersContext = useCustomersContext()

    const onChange = (id, field, value) =>
        CustomersContext.updateCustomer(id, field, value)

    return (
        <DataTable
            data={CustomersContext.customers}
            titles={['name', 'email', 'phone', 'address']}
            columns={[
                { property: 'customerName' },
                { property: 'customerEmail' },
                { property: 'customerContactNumber' },
                { property: 'customerAddress' },
            ]}
            onChange={onChange}
        />
    )
}

export default CustomersTable
