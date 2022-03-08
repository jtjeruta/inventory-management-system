import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppContextProvider } from './contexts/AppContext'
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext'
import DefaultLayout from './layouts/DefaultLayout'
import NotificationList from './components/NotificationList'
import NotFoundPage from './pages/NotFoundPage'
import AuthenticatedRoutes from './routes/authenticated'
import UnAuthenticatedRoutes from './routes/unAuthenticated'
import LoadingScreen from './components/LoadingScreen'

function AppRoutes() {
    const { user } = useAuthContext()
    const routes = user ? AuthenticatedRoutes : UnAuthenticatedRoutes

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
            <Route path="*" element={<NotFoundPage />} />
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
                <AppContent />
            </AuthContextProvider>
        </AppContextProvider>
    )
}

export default App
