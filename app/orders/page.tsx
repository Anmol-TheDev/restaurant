"use client"

import { Table } from "@/components/ui/table";
import { type orderRes,GetOrders } from "@/query/query.ordres";
import { useEffect, useState } from "react";




export default function OrdersPage() {
    const [orders, setOrders] = useState<orderRes>()

    useEffect(() => {
        ; (async () => {
            const res = await GetOrders({ status: "pending", limit: 10 })
            setOrders(res)
        })()
    }, [])

    if(orders == undefined){
        return (<div>Loading...</div>)
    }
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                
            </Table>
        </div>
    )
}