import dashboardData from "@/data/dashboard.json"

export type Trend = "up" | "down"

export type StatCard = {
  id: string
  label: string
  value: number
  change: number
  changeLabel: string
  trend: Trend
  icon: string
}

export type ActivityItem = {
  id: number
  message: string
  time: string
}

export type DashboardData = {
  restaurant: { name: string; tagline: string }
  stats: StatCard[]
  recentActivity: ActivityItem[]
}

export function getDashboardData(): DashboardData {
  return dashboardData as DashboardData
}
