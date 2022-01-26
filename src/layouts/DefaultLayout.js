import React from 'react'
import AdminNavbar from '../components/AdminNavBar'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <AdminNavbar />
            {children}
        </div>
    )
}

export default DefaultLayout
