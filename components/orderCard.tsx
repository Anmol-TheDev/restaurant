import { type order } from "@/query/query.ordres"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"

const statusStyles: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  paid:      "bg-blue-100 text-blue-700",
  shipped:   "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  refunded:  "bg-gray-100 text-gray-600",
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (diff < 1) return "just now"
  if (diff < 60) return `${diff} min ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`
  return `${Math.floor(diff / 1440)} days ago`
}

function fmt(currency: string, amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
}

export default function OrderCard({ order }: { order: order }) {
  const statusClass = statusStyles[order.status] ?? "bg-gray-100 text-gray-600"

  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md mb-4">

      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-base font-semibold leading-tight">{order.customer.name}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <svg className="size-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {order.shipping_method}
              </span>
              <span>·</span>
              <span>{timeAgo(order.created_at)}</span>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusClass}`}>
            {order.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-3">
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-medium uppercase tracking-wide">Order No: </span>
            <span className="font-semibold text-foreground">#{order.id}</span>
          </span>
          <span>
            <span className="font-medium uppercase tracking-wide">Phone: </span>
            <span className="font-semibold text-foreground">{order.customer.phone}</span>
          </span>
        </div>

        <div className="divide-y divide-border rounded-lg border text-sm">
          <div className="flex justify-between px-3 py-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{fmt(order.currency, order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between px-3 py-2">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">−{fmt(order.currency, order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between px-3 py-2">
            <span className="text-muted-foreground">Tax</span>
            <span>{fmt(order.currency, order.tax)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total</span>
          <span className="text-xl font-bold">{fmt(order.currency, order.total)}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto gap-2">
        <Button variant="outline" className="flex-1">
          Cancel Order
        </Button>
        <Button className="flex-1">
          Mark Served
        </Button>
      </CardFooter>

    </Card>
  )
}