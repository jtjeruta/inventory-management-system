import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../contexts/AuthContext'
import Input from './Input'

const LoginPage = () => {
    const { signin } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const handleSignin = async () => {
        setLoading(true)
        await signin()
        setLoading(false)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg w-2/5 px-16 py-16">
                <form>
                    <div className="flex font-bold justify-center">
                        <img
                            className="h-20 w-20"
                            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                            alt="avatar"
                        />
                    </div>
                    <h2 className="text-3xl text-center text-gray-700 mb-4">
                        Login Form
                    </h2>
                    <Input type="username" />
                    <Input type="password" />
                    <a
                        href="/"
                        className="text-xs text-green-400 hover:text-green-500 float-right mb-4"
                    >
                        Forgot Password?
                    </a>
                    <button
                        type="button"
                        className="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none"
                        onClick={handleSignin}
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
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
