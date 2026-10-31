import { getDashboardData } from "@/query/query.dashboard"
import { StatCardItem } from "@/components/statCard"
import { Activity } from "lucide-react"

export default function DashboardPage() {
  const { stats, recentActivity } = getDashboardData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your restaurant operations</p>
      </div>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCardItem key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Recent Activity
        </h2>
        <div className="rounded-2xl border divide-y">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 px-4 py-3">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                <Activity className="size-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.message}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
