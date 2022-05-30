import React from 'react'
import AdminNavbar from '../components/AdminNavBar'

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar />
            <div className="flex grow bg-slate-50">
                <div className="flex md:container mx-auto">
                    <div className="flex w-full p-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
