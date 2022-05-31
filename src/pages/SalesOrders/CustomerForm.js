import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import Card from '../../components/Card'

const CustomerForm = () => {
    const { register } = useFormContext()
    const [isFocused, setIsFocused] = useState(false)
    const { getFullDocsOfCollection } = useAuthContext()
    const [collectionMap, setCollectionMap] = useState([])
    const changeHandler = (e) => {
        const customerTempDetails = Object.fromEntries(collectionMap)[e]
        document.getElementById('cCNumber').value =
            customerTempDetails.customerContactNumber
        document.getElementById('cEmail').value =
            customerTempDetails.customerEmail
        document.getElementById('cAddress').value =
            customerTempDetails.customerAddress
    }
    const renderOptions = async () => {
        setCollectionMap(await getFullDocsOfCollection('customer'))
        const primaryElement = document.getElementById('customerSelect')
        primaryElement.addEventListener('change', (e) => {
            changeHandler(e.target.value)
        })
    }
    useEffect(async () => {
        setCollectionMap(await getFullDocsOfCollection('customer'))
    }, [])
    return (
        <Card className="grow basis-0 p-5">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <span className="text-red-700">* </span>Customer Name
                </label>
                <select
                    id="customerSelect"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-visible"
                    style={{ background: 'none  ' }}
                    onFocus={() => {
                        setIsFocused(true)
                        renderOptions()
                    }}
                    onBlur={() => setIsFocused(false)}
                    {...register('soCustomer')}
                    required
                    defaultValue=""
                    autoComplete="off"
                >
                    <option value="" disabled>
                        &nbsp;
                    </option>
                    {collectionMap &&
                        collectionMap.map((val) => (
                            <option key={val[0]} value={val[0]}>
                                {val[1].customerName}
                            </option>
                        ))}
                </select>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 caret-transparent">
                        Contact Number
                    </label>
                    <input
                        id="cCNumber"
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 caret-transparent"
                        placeholder=""
                        disabled
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 caret-transparent">
                        Email
                    </label>
                    <input
                        id="cEmail"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 caret-transparent"
                        placeholder=""
                        disabled
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 caret-transparent">
                        Address
                    </label>
                    <input
                        id="cAddress"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 caret-transparent"
                        placeholder=""
                        disabled
                    />
                </div>
            </div>
        </Card>
    )
}

export default CustomerForm
