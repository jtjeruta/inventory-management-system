import React from 'react'

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('../pages/LoginPage')),
    },
]

export default routes
