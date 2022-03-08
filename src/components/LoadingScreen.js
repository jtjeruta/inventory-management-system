import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../contexts/AuthContext'

const Container = styled.div`
    position: relative;
    transform: translateY(-50px);

    h3 {
        font-size: 24px;
        transform: translateY(10px);
    }

    &:before {
        position: absolute;
        content: '';
        display: block;
        top: 0;
        left: -25px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: rgb(251, 146, 60);
        transform-origin: 50%;
        animation: dribble 500ms alternate infinite ease;
    }

    @keyframes dribble {
        0% {
            top: 30px;
            height: 5px;
            border-radius: 60px 60px 20px 20px;
            transform: scaleX(2);
        }
        35% {
            height: 15px;
            border-radius: 50%;
            transform: scaleX(1);
        }
        100% {
            top: 0;
        }
    }
`

const Root = styled.div`
    &.status-fading {
        animation: fadeout 500ms alternate;
    }

    @keyframes fadeout {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`

const LoadingScreen = () => {
    const { authenticating } = useAuthContext()
    const [timerDone, setTimerDone] = useState(false)
    const [status, setStatus] = useState('visible')

    useEffect(() => {
        // Run animation for atleast 1 second
        if (authenticating) {
            setTimerDone(false)
            setTimeout(() => setTimerDone(true), 1000)
        }
    }, [authenticating])

    useEffect(() => {
        if (!authenticating && timerDone && status === 'visible') {
            setStatus('fading')
            setTimeout(() => setStatus('removed'), 500)
        }
    }, [authenticating, timerDone])

    if (status === 'removed') {
        return null
    }

    return (
        <Root
            // className={`status-${status}`}
            className={`bg-white absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center status-${status}`}
        >
            <Container>
                <h3 className="text-orange-400">NOW LOADING</h3>
            </Container>
        </Root>
    )
}

export default LoadingScreen
