import { type StatCard } from "@/query/query.dashboard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  ClipboardList,
  Clock,
  ChefHat,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  Clock,
  ChefHat,
  CheckCircle,
}

export function StatCardItem({ stat }: { stat: StatCard }) {
  const Icon = iconMap[stat.icon] ?? ClipboardList
  const isUp = stat.trend === "up"

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
        <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-4 text-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {isUp ? (
            <TrendingUp className="size-3 text-green-500" />
          ) : (
            <TrendingDown className="size-3 text-red-500" />
          )}
          <span className={isUp ? "text-green-600" : "text-red-500"}>
            {isUp ? "+" : ""}
            {stat.change}
          </span>
          <span>{stat.changeLabel}</span>
        </p>
      </CardContent>
    </Card>
  )
}
