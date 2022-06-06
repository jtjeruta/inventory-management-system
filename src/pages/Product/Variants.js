import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import Card from '../../components/Card'
import DataTable from '../../components/DataTable'
import { useInventoryContext } from '../../contexts/InventoryContext'
import { useAppContext } from '../../contexts/AppContext'
import AddVariantForm from './AddVariantForm'

const Variants = () => {
    const { isLoading } = useAppContext()
    const { selectedProduct, deleteSelectedProductVariant } =
        useInventoryContext()

    const rowActions = (id) => {
        const actions = [
            {
                id: 'delete',
                icon: faTrash,
                onClick: () => {
                    deleteSelectedProductVariant(id)
                },
            },
        ]
        return (
            <div className="flex gap-2 justify-center">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        className={clsx(
                            'text-blue-700 border border-blue-700 hover:bg-blue-700',
                            'hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300',
                            'font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center',
                            'dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
                        )}
                        onClick={action.onClick}
                    >
                        <FontAwesomeIcon icon={action.icon} />
                    </button>
                ))}
            </div>
        )
    }

    return (
        <Card className="grow basis-0 overflow-hidden p-0">
            {isLoading('get-product') || !selectedProduct ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <DataTable
                        data={selectedProduct.variants || []}
                        columns={[
                            {
                                title: 'Unit',
                                property: 'name',
                                editable: false,
                                titleClsx: 'w-2/5',
                            },
                            {
                                title: 'Qty',
                                property: 'units',
                                editable: false,
                                titleClsx: 'text-center w-2/5',
                                colClsx: 'text-center',
                            },
                            {
                                title: 'Actions',
                                property: 'id',
                                editable: false,
                                format: rowActions,
                                titleClsx: 'text-center w-1/5',
                                colClsx: 'text-center',
                            },
                        ]}
                        bgColor="slate"
                    />
                    <AddVariantForm />
                </>
            )}
        </Card>
    )
}

export default Variants
