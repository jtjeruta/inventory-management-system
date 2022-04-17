import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useVendorsContext } from '../../contexts/VendorsContext'

const VendorTable = () => {
    const VendorsContext = useVendorsContext()
    const headerClasses = clsx([
        'px-6 py-3 text-xs font-medium leading-4 tracking-wider',
        'text-left uppercase bg-teal-600 text-white',
    ])

    return (
        <table className="min-w-full max-w-full">
            <thead>
                <tr>
                    <th className={headerClasses}>Name</th>
                    <th className={headerClasses}>Email</th>
                    <th className={headerClasses}>Number</th>
                    <th className={headerClasses}>Address</th>
                </tr>
            </thead>

            <tbody className="bg-white">
                {VendorsContext.vendors
                    .sort((a, b) => a.vendorName.localeCompare(b.vendorName))
                    .map((vendor) => (
                        <tr key={vendor.id}>
                            <Column vendor={vendor} label="vendorName" />
                            <Column vendor={vendor} label="vendorEmail" />
                            <Column
                                vendor={vendor}
                                label="vendorContactNumber"
                            />
                            <Column vendor={vendor} label="vendorAddress" />
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

const Column = ({ vendor, label }) => {
    const VendorsContext = useVendorsContext()
    const [loading, setLoading] = useState(false)

    const onBlur = async (event) => {
        const value = event.target.innerHTML
        setLoading(true)
        await VendorsContext.updateVendor(vendor.id, label, value)
        setLoading(false)
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur()
        }
    }

    return (
        <td className="text-sm leading-5 text-white whitespace-nowrap border-b border-teal-600 bg-teal-500">
            <div className="flex gap-1">
                <span
                    className="px-6 py-4 grow break-all whitespace-pre-wrap outline-none focus:ring focus:ring-white"
                    onBlur={onBlur}
                    onKeyPress={onKeyPress}
                    contentEditable
                    suppressContentEditableWarning
                >
                    {vendor[label]}
                </span>

                <span className="px-6 py-4">
                    {loading && (
                        <FontAwesomeIcon
                            className="animate-spin"
                            icon={faSpinner}
                            style={{
                                marginRight: 10,
                                marginLeft: -26,
                            }}
                        />
                    )}
                </span>
            </div>
        </td>
    )
}

export default VendorTable
