import React from 'react'

const EmployeeLayout = ({ children }) => {
    return (
        <div className="flex md:container mx-auto">
            <div className="flex w-full p-5 pr-10">
                <div className="bg-sky-100 grow py-2 px-10 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default EmployeeLayout
