import React, { useEffect } from 'react'
import { useUsersContext } from '../../contexts/UsersContext'

const UsersPage = () => {
    const UsersContext = useUsersContext()

    useEffect(() => {
        async function init() {
            await UsersContext.listUsers()
        }

        init()
    }, [])

    return (
        <div className="md:container md:mx-auto p-5">
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">
                    Manage Users
                </h3>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </button>
                </div>
            </div>

            <div className="flex flex-col mt-5">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                                        {' '}
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {UsersContext.users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                            <div className="text-sm font-medium leading-5 text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                {user.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                                            {user.role}
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                                            {user.status}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersPage
