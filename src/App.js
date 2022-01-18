import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppContextProvider } from './contexts/AppContext'
import { FirebaseContextProvider } from './contexts/FirebaseContext'
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import NotificationList from './components/NotificationList'
import Vendors from './pages/Vendors'
import PurchaseOrders from './pages/PurchaseOrders'
import Inventory from './pages/Inventory'
import SalesOrders from './pages/SalesOrders'
import Customers from './pages/Customers'
import Logs from './pages/Logs'

function AppContent() {
    const { user } = useAuthContext()

    return (
        <>
            <NotificationList />
            <BrowserRouter>
                <Routes>
                    {!user ? (
                        <Route path="/" element={<LoginPage />} />
                    ) : (
                        <>
                            <Route path="/" element={<Vendors />} />
                            <Route
                                path="/PurchaseOrders"
                                element={<PurchaseOrders />}
                            />
                            <Route path="/Inventory" element={<Inventory />} />
                            <Route
                                path="/SalesOrders"
                                element={<SalesOrders />}
                            />
                            <Route path="/Customers" element={<Customers />} />
                            <Route path="/Logs" element={<Logs />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </>
    )
}

function App() {
    return (
        <AppContextProvider>
            <FirebaseContextProvider>
                <AuthContextProvider>
                    <AppContent />
                </AuthContextProvider>
            </FirebaseContextProvider>
        </AppContextProvider>
    )
}

export default App
