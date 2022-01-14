import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    width: fit-content;
    transition: transform 200ms;
    cursor: default;

    &:hover {
        transform: translateY(-5px);
    }
`

const SampleComponent = () => {
    return <Container className="p-1">This is a sample component</Container>
}

export default SampleComponent
