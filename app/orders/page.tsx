"use client"

import OrderTabs from "./orderTabs"

export default function OrdersPage() {
    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold">Orders</h1>
            <OrderTabs />
        </div>
    )
}