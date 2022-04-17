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
                { property: 'vendorName', editable: true },
                { property: 'vendorEmail', editable: true },
                { property: 'vendorContactNumber', editable: true },
                { property: 'vendorAddress', editable: true },
            ]}
            onChange={onChange}
        />
    )
}

export default VendorTable
