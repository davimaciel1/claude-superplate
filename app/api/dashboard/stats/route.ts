import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Mock dashboard stats - replace with actual DB queries
    const stats = {
      revenue: {
        total: 45231.89,
        change: 20.1,
        trend: "up",
        chartData: [
          { month: "Jan", revenue: 4000 },
          { month: "Feb", revenue: 3000 },
          { month: "Mar", revenue: 5000 },
          { month: "Apr", revenue: 4500 },
          { month: "May", revenue: 6000 },
          { month: "Jun", revenue: 5500 },
        ]
      },
      users: {
        total: 2350,
        change: 180,
        trend: "up",
        newThisWeek: 180,
      },
      sales: {
        total: 12234,
        change: 19,
        trend: "up",
      },
      activeNow: {
        total: 573,
        change: -4.3,
        trend: "down",
      },
      conversionRate: 3.2,
      avgOrderValue: 127.50,
      customerRetention: 89,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}