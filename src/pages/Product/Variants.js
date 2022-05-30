import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Card from '../../components/Card'
import DataTable from '../../components/DataTable'

const Variants = () => {
    const variants = [
        { id: 0, name: 'default', units: 1 },
        { id: 1, name: 'Sack of Socks', units: 8 },
        { id: 2, name: 'Box of Socks', units: 24 },
    ]

    const rowActions = () => {
        const actions = [
            { id: 'edit', icon: faEdit },
            { id: 'delete', icon: faTrash },
        ]
        return (
            <div className="flex gap-2 justify-center">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={action.icon} />
                    </button>
                ))}
            </div>
        )
    }

    return (
        <Card className="grow basis-0 overflow-hidden p-0">
            <DataTable
                data={variants}
                columns={[
                    { title: 'Variant', property: 'name', editable: false },
                    {
                        title: 'Units',
                        property: 'units',
                        editable: false,
                        titleClsx: 'text-center',
                        colClsx: 'text-center',
                    },
                    {
                        title: 'Actions',
                        property: 'id',
                        editable: false,
                        format: rowActions,
                        titleClsx: 'text-center',
                        colClsx: 'text-center',
                    },
                ]}
                bgColor="slate"
            />
        </Card>
    )
}

export default Variants
