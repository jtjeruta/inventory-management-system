import React from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'

const LoginPage = () => {
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
                        type="submit"
                        className="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none"
                    >
                        Button
                    </button>
                    <div>
                        <br />
                    </div>
                    <Link to="/Vendors">
                        <button
                            type="submit"
                            className="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none"
                        >
                            Sneaky Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
