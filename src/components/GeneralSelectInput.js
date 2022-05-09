import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../contexts/AuthContext'

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

const SelectInput = ({
    inputID,
    collection,
    collectionKey,
    inputName,
    isRequired,
    register,
    optionKey,
    optionValue,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasContent, setHasContent] = useState(false)
    const { getDocsOfCollection } = useAuthContext()
    const [collectionMap, setCollectionMap] = useState(false)
    const quickCheckTemp = optionKey !== undefined && optionValue !== undefined
    const renderOptions = async () => {
        if (quickCheckTemp) {
            setCollectionMap(
                await getDocsOfCollection(
                    collection,
                    collectionKey,
                    optionKey,
                    optionValue
                )
            )
        } else {
            setCollectionMap(
                await getDocsOfCollection(collection, collectionKey)
            )
        }
    }
    const handleChange = (value) => {
        setHasContent(value.length > 0)
    }
    return (
        <RootContainer
            className={`border-b relative grid my-5 py-1 focus:outline-none ${
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
                <select
                    className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-black"
                    style={{ background: 'none' }}
                    onFocus={() => {
                        setIsFocused(true)
                        renderOptions()
                    }}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => handleChange(e.target.value)}
                    {...register(inputID)}
                    required={isRequired}
                    defaultValue=""
                    autoComplete="off"
                >
                    <option value="" disabled>
                        &nbsp;
                    </option>
                    {collectionMap &&
                        collectionMap.map((val) => (
                            <option key={val[0]} value={val[0]}>
                                {val[1]}
                            </option>
                        ))}
                </select>
            </div>
        </RootContainer>
    )
}

export default SelectInput
