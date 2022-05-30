import React from 'react'
import Card from '../../components/Card'

const Details = () => {
    const details = {
        'Qty in Warehouse': 100,
        'Qty in Store': 50,
        'Ave. Price': 145.5,
        Markup: '15%',
    }

    return (
        <Card>
            <h5 className="font-medium mb-4">Extra Details</h5>

            <ul className="w-full text-gray-900">
                {Object.keys(details).map((key) => {
                    const value = details[key]

                    return (
                        <li
                            key={key}
                            className="py-2 border-b border-gray-200 w-full rounded-t-lg text-sm"
                        >
                            <div className="flex gap-4">
                                <span className="w-32">{key}:</span>
                                <span>{value}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default Details
