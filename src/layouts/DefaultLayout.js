import React from 'react'
import AdminNavbar from '../components/AdminNavBar'

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar />
            <div className="flex grow bg-slate-300">{children}</div>
        </div>
    )
}

export default DefaultLayout
