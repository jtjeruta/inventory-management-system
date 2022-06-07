import React from 'react'
import { useFormContext } from 'react-hook-form'
import Card from '../../components/Card'

const RemarksForm = ({ className }) => {
    const { register } = useFormContext()
    return (
        <Card className={`p-5 ${className}`}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remarks
            </label>
            <textarea
                className="border-b border-gray-200 w-full rounded-md text-sm p-2 h-5/6"
                {...register('soRemarks')}
                type="textarea"
                name="soRemarks"
                id="soRemarksTextArea"
            />
        </Card>
    )
}

export default RemarksForm
