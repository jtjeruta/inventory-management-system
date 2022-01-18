import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppContextProvider } from './contexts/AppContext'
import { FirebaseContextProvider } from './contexts/FirebaseContext'
import { AuthContextProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import NotificationList from './components/NotificationList'

function AppContent() {
    return (
        <div>
            <NotificationList />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
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
