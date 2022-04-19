import React from 'react'
import { useVendorsContext } from '../../contexts/VendorsContext'
import DataTable from '../../components/DataTable'

const VendorTable = () => {
    const VendorsContext = useVendorsContext()

    const onChange = (id, field, value) =>
        VendorsContext.updateVendor(id, field, value)

    return (
        <DataTable
            data={VendorsContext.vendors}
            titles={['name', 'email', 'phone', 'address']}
            columns={[
                { property: 'vendorName' },
                { property: 'vendorEmail' },
                { property: 'vendorContactNumber' },
                { property: 'vendorAddress' },
            ]}
            onChange={onChange}
        />
    )
}

export default VendorTable
