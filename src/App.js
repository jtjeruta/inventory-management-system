import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Vendors from './pages/Vendors'
import PurchaseOrders from './pages/PurchaseOrders'
import Inventory from './pages/Inventory'
import SalesOrders from './pages/SalesOrders'
import Customers from './pages/Customers'
import Logs from './pages/Logs'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/Vendors" element={<Vendors />} />
                    <Route
                        path="/PurchaseOrders"
                        element={<PurchaseOrders />}
                    />
                    <Route path="/Inventory" element={<Inventory />} />
                    <Route path="/SalesOrders" element={<SalesOrders />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Logs" element={<Logs />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
