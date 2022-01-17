import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'

const AdminNavbar = ({ activeKey }) => {
    return (
        <Navbar id="MainNavBar" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand id="NavTitle">
                Inventory Management System
            </Navbar.Brand>
            <Container id="NavBody">
                <Nav
                    justify
                    variant="tabs"
                    defaultActiveKey={activeKey}
                    className="MainNav"
                >
                    <Nav.Item>
                        <Nav.Link href="./Vendors">Vendors</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="./PurchaseOrders">
                            Purchase Orders
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="./Inventory">Inventory</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="./SalesOrders">Sales Order</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="./Customers">Customer</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="./Logs">Logs</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Navbar.Brand id="NavLogout" href="./">
                Log out
            </Navbar.Brand>
        </Navbar>
    )
}

export default AdminNavbar
