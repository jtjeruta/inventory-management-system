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
            columns={[
                { title: 'name', property: 'customerName' },
                { title: 'email', property: 'customerEmail' },
                { title: 'phone', property: 'customerContactNumber' },
                { title: 'address', property: 'customerAddress' },
            ]}
            onChange={onChange}
        />
    )
}

export default CustomersTable
