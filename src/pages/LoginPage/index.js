import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '../../contexts/AuthContext'
import Button from './Button'
import Input from './Input'

const LoginPage = () => {
    const { register, handleSubmit } = useForm()
    const { signin } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const onSubmit = async ({ email, password }) => {
        setLoading(true)
        const response = await signin(email, password)
        !response[0] && setLoading(false)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg w-full max-w-sm py-16 px-5">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Input type="email" register={register} />
                    <Input type="password" register={register} />
                    <br />
                    <Button text="Log in" loading={loading} />

                    {process.env.NODE_ENV === 'development' && (
                        <>
                            <div className="text-center pb-5 pt-10">
                                [Dev Mode Quick Logins]
                            </div>
                            <Button
                                text="Log in as admin"
                                loading={loading}
                                type="button"
                                className="mb-5"
                                onClick={() =>
                                    onSubmit({
                                        email: 'admin@gmail.com',
                                        password: 'password',
                                    })
                                }
                            />
                            <Button
                                text="Log in as employee"
                                loading={loading}
                                type="button"
                                onClick={() =>
                                    onSubmit({
                                        email: 'employee@gmail.com',
                                        password: 'password',
                                    })
                                }
                            />
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default LoginPage
