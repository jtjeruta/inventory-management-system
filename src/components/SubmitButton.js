import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Button = ({ text, loading, className }) => {
    return (
        <button
            type="submit"
            className={`w-full py-2 rounded-full bg-green-600 text-gray-100 hover:bg-green-700 shadow-md transition-colors duration-300 ease-in-out ${className}`}
            disabled={loading}
        >
            {loading && (
                <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin"
                    style={{
                        marginRight: 10,
                        marginLeft: -26,
                    }}
                />
            )}
            {text}
        </button>
    )
}

export default Button
