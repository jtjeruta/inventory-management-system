import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext'
import NavBarTab from './NavBarTab'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { signout, user } = useAuthContext()

    const links = [
        {
            text: 'Vendors',
            active: location.pathname === '/',
            onClick: () => navigate('/'),
            roles: ['admin'],
        },
        {
            text: 'Purchase Orders',
            active:
                user.role === 'admin'
                    ? location.pathname === '/purchase-orders'
                    : location.pathname === '/',
            onClick: () =>
                navigate(user.role === 'admin' ? '/purchase-orders' : '/'),
            roles: ['admin', 'employee'],
        },
        {
            text: 'Inventory',
            active: location.pathname === '/inventory',
            onClick: () => navigate('/inventory'),
            roles: ['admin'],
        },
        {
            text: 'Sales Orders',
            active: location.pathname === '/sales-orders',
            onClick: () => navigate('/sales-orders'),
            roles: ['admin'],
        },
        {
            text: 'Customers',
            active: location.pathname === '/customers',
            onClick: () => navigate('/customers'),
            roles: ['admin'],
        },
        {
            text: 'Logs',
            active: location.pathname === '/logs',
            onClick: () => navigate('/logs'),
            roles: ['admin'],
        },
        {
            text: 'Users',
            active: location.pathname === '/users',
            onClick: () => navigate('/users'),
            roles: ['admin'],
        },
        {
            text: 'Logout',
            active: false,
            onClick: () => signout(),
            roles: ['admin', 'employee'],
        },
    ]

    return (
        <nav className="bg-neutral-700 flex">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link
                    className="inline-block py-3 px-4 font-semibold text-white"
                    to="/"
                >
                    Inventory Management System
                </Link>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="flex place-content-center">
                        {links
                            .filter((link) => link.roles.includes(user.role))
                            .map((link) => (
                                <NavBarTab
                                    key={link.text}
                                    active={link.active}
                                    onClick={link.onClick}
                                >
                                    {link.text}
                                </NavBarTab>
                            ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar
