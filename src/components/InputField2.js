import React, { useState } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

const InputField2 = ({
    name,
    label,
    type,
    required,
    defaultValue,
    placeholder,
    autoCompleteOptions,
}) => {
    const [options, setOptions] = useState([])
    const [value, setValue] = useState(defaultValue || '')
    const { setValue: setFormValue, register } = useFormContext()

    const handleChange = (targetValue) => {
        setValue(targetValue)
        const filteredOptions = (autoCompleteOptions || []).filter(
            (option) =>
                option !== targetValue &&
                new RegExp(targetValue, 'igm').test(option)
        )
        setOptions(filteredOptions)
    }

    return (
        <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {required ? <span className="text-red-700">* </span> : null}
                {label}
            </label>
            <input
                type={type || 'text'}
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                onInput={(e) => handleChange(e.target.value)}
                {...register(name)}
            />
            <AutoComplete
                options={options}
                onClick={(option) => {
                    setValue(option)
                    setOptions([])
                    setFormValue(name, option)
                }}
            />
        </div>
    )
}

const AutoComplete = (props) => (
    <ul
        className={clsx(
            'absolute w-full rounded-lg shadow-lg select-none bg-white z-10 top-14',
            props.options.length <= 0 ? 'hidden' : ''
        )}
    >
        {props.options.map((option, i, arr) => {
            let className = 'px-4 hover:bg-gray-100 '

            if (i === 0 && arr.length === 1) className += 'py-2 rounded-lg'
            else if (i === 0) className += 'pt-2 pb-1 rounded-t-lg'
            else if (i === arr.length) className += 'pt-1 pb-2 rounded-b-lg'
            else className += 'py-1'

            return (
                <li
                    className={className}
                    key={option}
                    onClick={() => props.onClick(option)}
                >
                    {option}
                </li>
            )
        })}
    </ul>
)

export default InputField2
