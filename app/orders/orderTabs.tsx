"use client"

import OrderCard from "@/components/orderCard"
import { Pagination } from "@/components/pagination"
import { SearchBar, useDebounce } from "@/components/searchBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type order, type orderRes, GetOrders } from "@/query/query.ordres"
import { useEffect, useState } from "react"

type Status = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded"

const LIMIT = 6

const TABS: { label: string; value: Status }[] = [
    { label: "Pending",   value: "pending"   },
    { label: "Paid",      value: "paid"      },
    { label: "Shipped",   value: "shipped"   },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Refunded",  value: "refunded"  },
]

function matchesQuery(order: order, query: string): boolean {
    const q = query.toLowerCase()
    return (
        order.customer.name.toLowerCase().includes(q) ||
        order.id.toString().includes(q)
    )
}

type Meta = orderRes["meta"]

function OrderGrid({ status, search }: { status: Status; search: string }) {
    const [data, setData] = useState<order[]>([])
    const [meta, setMeta] = useState<Meta>({ page: 1, limit: LIMIT, total: 0, pages: 1 })
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<{ code: number; message: string } | null>(null)

    const load = async (p: number) => {
        setLoading(true)
        setError(null)
        try {
            const res: orderRes = await GetOrders({ status, limit: LIMIT, page: p, expand: true })
            setData(res.data)
            setMeta(res.meta)
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
        setPage(1)
        load(1)
    }, [status])

    const handlePageChange = (p: number) => {
        setPage(p)
        load(p)
    }

    const filtered = search ? data.filter((o) => matchesQuery(o, search)) : data

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: LIMIT }).map((_, i) => (
                        <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
                    ))}
                </div>
                <div className="h-7 w-64 animate-pulse rounded-lg bg-muted" />
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
                    onClick={() => load(page)}
                    className="mt-1 rounded-full border px-4 py-1.5 text-xs font-medium transition hover:bg-muted"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (filtered.length === 0) {
        return (
            <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
                {search ? `No results for "${search}"` : `No ${status} orders found.`}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>

            {!search && meta.pages > 1 && (
                <Pagination
                    page={page}
                    totalPages={meta.pages}
                    total={meta.total}
                    limit={meta.limit}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}

export default function OrderTabs() {
    const [active, setActive] = useState<Status>("pending")
    const [rawSearch, setRawSearch] = useState("")
    const search = useDebounce(rawSearch, 300)

    return (
        <Tabs className="" value={active} onValueChange={(v) => setActive(v as Status)}>
            <div className="flex items-center justify-between gap-4 mb-4">
                <TabsList>
                    {TABS.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <SearchBar
                    value={rawSearch}
                    onChange={setRawSearch}
                    placeholder="Search by name or order ID…"
                    className="w-64"
                />
            </div>

            {TABS.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    <OrderGrid status={tab.value} search={search} />
                </TabsContent>
            ))}
        </Tabs>
    )
}