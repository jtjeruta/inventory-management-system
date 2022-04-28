import React from 'react'

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('../pages/SalesOrders')),
    },
]

export default routes
