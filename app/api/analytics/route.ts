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

    // Mock analytics data
    const analytics = {
      pageViews: {
        total: 1234567,
        change: 12.5,
        data: [
          { date: "Mon", views: 12000 },
          { date: "Tue", views: 15000 },
          { date: "Wed", views: 13000 },
          { date: "Thu", views: 18000 },
          { date: "Fri", views: 20000 },
          { date: "Sat", views: 16000 },
          { date: "Sun", views: 14000 },
        ]
      },
      uniqueVisitors: {
        total: 456789,
        change: 8.3,
        data: [
          { date: "Mon", visitors: 4000 },
          { date: "Tue", visitors: 5000 },
          { date: "Wed", visitors: 4500 },
          { date: "Thu", visitors: 6000 },
          { date: "Fri", visitors: 7000 },
          { date: "Sat", visitors: 5500 },
          { date: "Sun", visitors: 4800 },
        ]
      },
      bounceRate: {
        total: 32.5,
        change: -2.1,
      },
      avgSessionDuration: {
        total: "3m 45s",
        change: 5.2,
      },
      topPages: [
        { path: "/", views: 45000, percentage: 35 },
        { path: "/dashboard", views: 32000, percentage: 25 },
        { path: "/pricing", views: 28000, percentage: 22 },
        { path: "/blog", views: 15000, percentage: 12 },
        { path: "/docs", views: 8000, percentage: 6 },
      ],
      topReferrers: [
        { source: "Google", visits: 25000, percentage: 40 },
        { source: "Direct", visits: 20000, percentage: 32 },
        { source: "Twitter", visits: 10000, percentage: 16 },
        { source: "GitHub", visits: 5000, percentage: 8 },
        { source: "Other", visits: 2500, percentage: 4 },
      ],
      devices: [
        { type: "Desktop", sessions: 60, color: "#8b5cf6" },
        { type: "Mobile", sessions: 35, color: "#3b82f6" },
        { type: "Tablet", sessions: 5, color: "#10b981" },
      ],
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}