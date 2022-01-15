import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const RootContainer = styled.div`
    .i {
        color: #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > div {
        position: relative;
        height: 45px;
    }

    & > div > h5 {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 18px;
        transition: 0.3s;
    }

    &:before,
    &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #38d39f;
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

    &.focus > .i > svg {
        color: #38d39f;
    }
`

const Input = ({ type }) => {
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
            style={{ gridTemplateColumns: '7% 93%' }}
        >
            <div className="i">
                {type === 'username' ? (
                    <FontAwesomeIcon icon={faUser} />
                ) : (
                    <FontAwesomeIcon icon={faLock} />
                )}
            </div>
            <div className="div">
                <h5>{type === 'username' ? 'Username' : 'Password'}</h5>
                <input
                    type={type === 'username' ? 'text' : 'password'}
                    className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-gray-700"
                    style={{ background: 'none' }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
        </RootContainer>
    )
}

export default Input
