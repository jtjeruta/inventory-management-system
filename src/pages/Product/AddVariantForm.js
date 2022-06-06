import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import InputField2 from '../../components/InputField2'
import { useInventoryContext } from '../../contexts/InventoryContext'

const AddVariantForm = () => {
    const methods = useForm()
    const [inputKey, setInputKey] = useState(new Date().getTime())
    const { addSelectedProductVariant } = useInventoryContext()

    const onSubmit = async (values) => {
        setInputKey(new Date().getTime())
        await addSelectedProductVariant(values)
        methods.reset()
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="w-2/5 p-4">
                        <InputField2
                            name="name"
                            placeholder="unit name"
                            required
                            key={inputKey}
                        />
                    </div>
                    <div className="w-2/5 p-4">
                        <InputField2
                            name="units"
                            placeholder="100"
                            type="number"
                            required
                            key={inputKey}
                        />
                    </div>
                    <div className="text-center w-1/5 p-4">
                        <button
                            className={clsx(
                                'text-white border border-blue-700 bg-blue-700 hover:bg-blue-800',
                                'hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300',
                                'font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center',
                                'dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
                            )}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default AddVariantForm
