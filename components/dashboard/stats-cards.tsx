"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Users, CreditCard, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Subscriptions",
    value: "+2350",
    description: "+180.1% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    icon: CreditCard,
    trend: "up",
  },
  {
    title: "Active Now",
    value: "+573",
    description: "-4.3% from last hour",
    icon: Activity,
    trend: "down",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.trend === "up" ? (
                    <ArrowUp className="inline h-3 w-3" />
                  ) : (
                    <ArrowDown className="inline h-3 w-3" />
                  )}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}