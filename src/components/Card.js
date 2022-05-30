import React from 'react'
import clsx from 'clsx'

const Card = ({ children, className }) => (
    <div
        className={clsx(
            'bg-white rounded-lg border border-gray-200 shadow-md p-4',
            className || ''
        )}
    >
        {children}
    </div>
)

export default Card
