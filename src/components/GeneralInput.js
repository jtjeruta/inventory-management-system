import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

const RootContainer = styled.div`
    & > div {
        position: relative;
        height: 45px;
    }

    & > div > h5 {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #134e4a;
        font-size: 18px;
        transition: 0.3s;
    }
    & {
        border-bottom-color: #1e5a7d;
    }
    &:before,
    &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #134e4a;
        transition: 0.4s;
    }

    &:before {
        right: 50%;
    }

    &:after {
        left: 50%;
    }

    &.focus:before,
    &.focus:after {
        width: 50%;
    }

    &.focus > div > h5 {
        top: -5px;
        font-size: 15px;
    }

    &.has-content > div > h5 {
        top: -5px;
        font-size: 15px;
    }
`

const SimpleInput = ({
    inputID,
    inputName,
    inputType,
    isRequired,
    register,
    defaultValue,
    autoCompleteOptions,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [options, setOptions] = useState([])
    const [value, setValue] = useState(defaultValue || '')

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
        <RootContainer
            className={clsx(
                `border-b relative grid my-5 py-1 focus:outline-none`,
                isFocused && 'focus',
                value !== '' && 'has-content'
            )}
        >
            <div className="relative">
                <h5 className="font-semibold">
                    {isRequired ? (
                        <span className="text-red-700">* </span>
                    ) : null}
                    {inputName}
                </h5>
                <input
                    type={inputType || 'text'}
                    className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-black"
                    style={{ background: 'none' }}
                    onFocus={() => setIsFocused(true)}
                    value={value}
                    onInput={(e) => handleChange(e.target.value)}
                    {...register(inputID, {
                        onBlur: (e) => !e.target.value && setIsFocused(false),
                    })}
                    required={isRequired}
                    autoComplete="off"
                />
                <AutoComplete
                    options={options}
                    onClick={(option) => {
                        setValue(option)
                        setOptions([])
                    }}
                />
            </div>
        </RootContainer>
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

export default SimpleInput
