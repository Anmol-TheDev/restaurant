"use client"

import OrderCard from "@/components/orderCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type order, type orderRes, GetOrders } from "@/query/query.ordres"
import { useEffect, useState } from "react"

type Status = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded"

const TABS: { label: string; value: Status }[] = [
    { label: "Pending",   value: "pending"   },
    { label: "Paid",      value: "paid"      },
    { label: "Shipped",   value: "shipped"   },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Refunded",  value: "refunded"  },
]

function OrderGrid({ status }: { status: Status }) {
    const [data, setData] = useState<order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<{ code: number; message: string } | null>(null)

    const load = async () => {
        setLoading(true)
        setError(null)
        setData([])
        try {
            const res: orderRes = await GetOrders({ status, limit: 6, expand: true })
            setData(res.data)
        } catch (err: unknown) {
            const code = (err as { status?: number }).status ?? 0
            const message =
                code === 429
                    ? "Too many requests — please wait a moment before trying again."
                    : (err as Error).message ?? "Something went wrong."
            setError({ code, message })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [status])

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed text-sm">
               
                <p className="font-medium text-foreground">
                    {error.code === 429 ? "Rate limit reached" : "Failed to load orders"}
                </p>
                <p className="text-muted-foreground">{error.message}</p>
                <button
                    onClick={load}
                    className="mt-1 rounded-full border px-4 py-1.5 text-xs font-medium transition hover:bg-muted"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
                No {status} orders found.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}

export default function OrderTabs() {
    const [active, setActive] = useState<Status>("pending")

    return (
        <Tabs value={active} onValueChange={(v) => setActive(v as Status)}>
            <TabsList>
                {TABS.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {TABS.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    <OrderGrid status={tab.value} />
                </TabsContent>
            ))}
        </Tabs>
    )
}