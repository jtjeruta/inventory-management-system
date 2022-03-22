import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

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
        color: black;
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
        background-color: #299672;
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
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasContent, setHasContent] = useState(false)
    const handleChange = (value) => {
        setHasContent(value.length > 0)
    }
    return (
        <RootContainer
            className={`border-b-2 relative grid my-5 py-1 focus:outline-none ${
                isFocused && 'focus'
            } ${hasContent && 'has-content'}`}
        >
            <div className="div">
                <h5 className="font-semibold">
                    {isRequired ? (
                        <span className="text-red-700">* </span>
                    ) : null}
                    {inputName}
                </h5>
                <input
                    type={inputType}
                    className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-black"
                    style={{ background: 'none' }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => handleChange(e.target.value)}
                    {...register(inputID)}
                    required={isRequired}
                    autoComplete="off"
                />
            </div>
        </RootContainer>
    )
}

export default SimpleInput
