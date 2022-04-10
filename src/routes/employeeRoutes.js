import React from 'react'

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('../pages/PurchaseOrders')),
    },
]

export default routes
