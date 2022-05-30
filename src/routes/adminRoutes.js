import React from 'react'

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('../pages/Vendors')),
    },
    {
        path: '/purchase-orders',
        component: React.lazy(() => import('../pages/PurchaseOrders')),
    },
    {
        path: '/inventory',
        component: React.lazy(() => import('../pages/Inventory')),
    },
    {
        path: '/inventory/:productId',
        component: React.lazy(() => import('../pages/Product')),
    },
    {
        path: '/sales-orders',
        component: React.lazy(() => import('../pages/SalesOrders')),
    },
    {
        path: '/customers',
        component: React.lazy(() => import('../pages/Customers')),
    },
    {
        path: '/logs',
        component: React.lazy(() => import('../pages/Logs')),
    },
    {
        path: '/users',
        component: React.lazy(() => import('../pages/Users')),
    },
]

export default routes
