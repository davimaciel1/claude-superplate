import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { RateLimitError } from "./errors"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Create a new ratelimiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
})

export async function withAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return handler(req, userId)
  }
}

export async function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  identifier?: string
) {
  return async (req: NextRequest) => {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const ip = req.ip ?? "127.0.0.1"
      const { success } = await ratelimit.limit(identifier ?? ip)

      if (!success) {
        throw new RateLimitError()
      }
    }

    return handler(req)
  }
}

export async function withErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error("API Error:", error)

      if (error instanceof Error) {
        const statusCode = (error as any).statusCode || 500
        const code = (error as any).code || "INTERNAL_ERROR"
        
        return NextResponse.json(
          {
            error: error.message,
            code,
          },
          { status: statusCode }
        )
      }

      return NextResponse.json(
        {
          error: "Internal server error",
          code: "INTERNAL_ERROR",
        },
        { status: 500 }
      )
    }
  }
}