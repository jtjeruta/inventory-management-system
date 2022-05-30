import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Card from '../../components/Card'

const History = () => {
    const history = [
        {
            id: 0,
            type: 'stock-transfer',
            from: 'warehouse',
            to: 'store',
            units: 20,
            date: new Date('2022/01/11'),
        },
        {
            id: 1,
            type: 'price-change',
            from: 100,
            to: 150,
            date: new Date('2022/01/12'),
        },
        {
            id: 2,
            type: 'stock-transfer',
            from: 'warehouse',
            to: 'store',
            units: 10,
            date: new Date('2022/01/15'),
        },
        {
            id: 3,
            type: 'stock-transfer',
            from: 'warehouse',
            to: 'store',
            units: 50,
            date: new Date('2022/01/20'),
        },
    ].sort((a, b) => b.date.getDate() - a.date.getDate())

    const typeColors = {
        'stock-transfer': 'blue',
        'price-change': 'green',
    }

    return (
        <Card>
            <h5 className="font-medium mb-4">History</h5>

            <ul className="w-full text-gray-900">
                {history.map((item) => {
                    const typeColor = typeColors[item.type]

                    return (
                        <li
                            key={item.id}
                            className="py-2 border-b border-gray-200 w-full rounded-t-lg"
                        >
                            <div className="flex justify-between align-center">
                                <div className="flex gap-10">
                                    <div
                                        className={clsx([
                                            `bg-${typeColor}-100 text-${typeColor}-800 text-sm`,
                                            `font-medium mr-2 px-2.5 py-0.5 rounded`,
                                            'w-32 text-center',
                                        ])}
                                    >
                                        {item.type}
                                    </div>
                                    <div className="flex gap-2 align-center">
                                        <span>{item.from}</span>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        </span>
                                        <span>{item.to}</span>
                                    </div>
                                    {item.units && (
                                        <div>{item.units} units</div>
                                    )}
                                </div>

                                <div className="text-xs text-gray-400">
                                    {item.date.toLocaleDateString()}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default History
