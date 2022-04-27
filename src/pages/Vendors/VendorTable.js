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
            columns={[
                { title: 'name', property: 'vendorName' },
                { title: 'email', property: 'vendorEmail' },
                { title: 'phone', property: 'vendorContactNumber' },
                { title: 'address', property: 'vendorAddress' },
            ]}
            onChange={onChange}
        />
    )
}

export default VendorTable
