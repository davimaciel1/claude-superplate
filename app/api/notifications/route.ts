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

    // Mock notifications
    const notifications = [
      {
        id: "1",
        title: "New subscription",
        description: "John Doe subscribed to Pro plan",
        time: "2 minutes ago",
        read: false,
        type: "success",
      },
      {
        id: "2",
        title: "Payment received",
        description: "Payment of $29.00 received",
        time: "1 hour ago",
        read: false,
        type: "info",
      },
      {
        id: "3",
        title: "New team member",
        description: "Jane Smith joined your team",
        time: "3 hours ago",
        read: true,
        type: "info",
      },
    ]

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest
) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { notificationId, read } = await req.json()

    // Mock update - replace with actual DB update
    return NextResponse.json({
      id: notificationId,
      read,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}