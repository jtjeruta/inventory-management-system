import React from 'react'
import NavBarTab from './NavBarTab'

const AdminNavbar = ({ activeKey }) => {
    return (
        <nav className="bg-neutral-700 flex">
            <div className="basis-1/4">
                <a
                    className="inline-block py-3 px-4 font-semibold text-white"
                    href="./Vendors"
                >
                    Inventory Management System
                </a>
            </div>
            <div className="basis-2/4">
                <ul className="flex place-content-center">
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="Vendors"
                        hrefLink="./Vendors"
                    >
                        Vendors
                    </NavBarTab>
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="PurchaseOrders"
                        hrefLink="./PurchaseOrders"
                    >
                        PurchaseOrders
                    </NavBarTab>
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="Inventory"
                        hrefLink="./Inventory"
                    >
                        Inventory
                    </NavBarTab>
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="SalesOrders"
                        hrefLink="./SalesOrders"
                    >
                        SalesOrders
                    </NavBarTab>
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="Customers"
                        hrefLink="./Customers"
                    >
                        Customers
                    </NavBarTab>
                    <NavBarTab
                        activeKey={activeKey}
                        navbarKey="Logs"
                        hrefLink="./Logs"
                    >
                        Logs
                    </NavBarTab>
                </ul>
            </div>
            <div className="basis-1/4">
                <a
                    className="flex inline-block py-3 px-4 font-semibold text-white place-content-end"
                    href="./"
                >
                    Log Out
                </a>
            </div>
        </nav>
    )
}

export default AdminNavbar
