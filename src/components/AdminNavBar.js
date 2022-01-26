import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext'
import NavBarTab from './NavBarTab'

const AdminNavbar = () => {
    const location = useLocation()
    const { signout } = useAuthContext()

    return (
        <nav className="bg-neutral-700 flex">
            <div className="basis-1/4">
                <Link
                    className="inline-block py-3 px-4 font-semibold text-white"
                    to="/"
                >
                    Inventory Management System
                </Link>
            </div>
            <div className="basis-2/4">
                <ul className="flex place-content-center">
                    <NavBarTab
                        active={location.pathname === '/'}
                        navbarKey="Vendors"
                        hrefLink="/"
                    >
                        Vendors
                    </NavBarTab>
                    <NavBarTab
                        active={location.pathname === '/purchase-orders'}
                        navbarKey="PurchaseOrders"
                        hrefLink="/purchase-orders"
                    >
                        PurchaseOrders
                    </NavBarTab>
                    <NavBarTab
                        active={location.pathname === '/inventory'}
                        navbarKey="Inventory"
                        hrefLink="/inventory"
                    >
                        Inventory
                    </NavBarTab>
                    <NavBarTab
                        active={location.pathname === '/sales-orders'}
                        navbarKey="SalesOrders"
                        hrefLink="/sales-orders"
                    >
                        SalesOrders
                    </NavBarTab>
                    <NavBarTab
                        active={location.pathname === '/customers'}
                        navbarKey="Customers"
                        hrefLink="/customers"
                    >
                        Customers
                    </NavBarTab>
                    <NavBarTab
                        active={location.pathname === '/logs'}
                        navbarKey="Logs"
                        hrefLink="/logs"
                    >
                        Logs
                    </NavBarTab>
                </ul>
            </div>
            <div className="basis-1/4">
                <button
                    type="button"
                    className="flex inline-block py-3 px-4 font-semibold text-white place-content-end"
                    onClick={() => signout()}
                >
                    Log Out
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar
