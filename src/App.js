import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AppContextProvider } from './contexts/AppContext'
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext'
import DefaultLayout from './layouts/DefaultLayout'
import NotificationList from './components/NotificationList'
import NotFoundPage from './pages/NotFoundPage'
import AdminRoutes from './routes/adminRoutes'
import EmployeeRoutes from './routes/employeeRoutes'
import UnAuthenticatedRoutes from './routes/unAuthenticatedRoutes'
import LoadingScreen from './components/LoadingScreen'
import { UsersContextProvider } from './contexts/UsersContext'

function AppRoutes() {
    const { user } = useAuthContext()
    const routes = user
        ? user.role === 'admin'
            ? AdminRoutes
            : EmployeeRoutes
        : UnAuthenticatedRoutes

    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <React.Suspense fallback={<>...</>}>
                            <route.component />
                        </React.Suspense>
                    }
                />
            ))}
            <Route
                path="*"
                element={user ? <NotFoundPage /> : <Navigate to="/" />}
            />
        </Routes>
    )
}

function AppContent() {
    const { user } = useAuthContext()

    return (
        <>
            <LoadingScreen />
            <NotificationList />
            <BrowserRouter>
                {user ? (
                    <DefaultLayout>
                        <AppRoutes />
                    </DefaultLayout>
                ) : (
                    <AppRoutes />
                )}
            </BrowserRouter>
        </>
    )
}

function App() {
    return (
        <AppContextProvider>
            <AuthContextProvider>
                <UsersContextProvider>
                    <AppContent />
                </UsersContextProvider>
            </AuthContextProvider>
        </AppContextProvider>
    )
}

export default App
