import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../contexts/AuthContext'
import Card from '../../components/Card'

const ProductSelectionForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const { getFullDocsOfCollection } = useAuthContext()
    const [collectionMap, setCollectionMap] = useState([])
    const [soTotalPrice, setTotalPrice] = useState(0)
    useEffect(async () => {
        setCollectionMap(await getFullDocsOfCollection('product'))
    }, [])
    const soTotalPriceShowcaseHolder = document.getElementById(
        'soTotalPriceShowcase'
    )
    useEffect(async () => {
        if (soTotalPriceShowcaseHolder != null)
            soTotalPriceShowcaseHolder.innerHTML = soTotalPrice
    }, [soTotalPrice])

    return (
        <Card className="p-3">
            <div className="p-2 w-full overflow-auto max-h-96">
                <ul className="w-full text-gray-900">
                    {errors.soProduct && (
                        <p className="text-sm font-semibold text-red-700">
                            <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                            {errors.soProduct.message}
                        </p>
                    )}
                    <li className="py-2 border-b border-gray-200 w-full rounded-t-lg text-sm font-semibold">
                        <div className="flex gap-4">
                            <span className="w-1" />
                            <span className="w-2/4">
                                <span className="text-red-700">* </span>Product
                            </span>
                            <span className="w-1/4">SKU</span>
                            <span className="w-1/4">Price</span>
                        </div>
                    </li>
                    {collectionMap &&
                        collectionMap.map((val) => (
                            <li
                                key={val[0]}
                                className="py-2 border-b border-gray-200 w-full rounded-t-lg text-sm"
                            >
                                <div className="flex gap-4">
                                    <span className="w-1">
                                        <input
                                            {...register('soProduct', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'You must select at least one product',
                                                },
                                            })}
                                            type="checkbox"
                                            name="soProduct"
                                            value={val[0]}
                                            id={val[0]}
                                            onClick={(e) => {
                                                if (e.currentTarget.checked) {
                                                    setTotalPrice(
                                                        soTotalPrice +
                                                            val[1].price
                                                    )
                                                } else {
                                                    setTotalPrice(
                                                        soTotalPrice -
                                                            val[1].price
                                                    )
                                                }
                                            }}
                                        />
                                    </span>
                                    <span className="w-2/4">{val[1].name}</span>
                                    <span className="w-1/4">{val[1].sku}</span>
                                    <span className="w-1/4">
                                        {val[1].price}
                                    </span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </Card>
    )
}

export default ProductSelectionForm
