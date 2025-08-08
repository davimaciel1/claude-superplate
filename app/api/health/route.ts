import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

/**
 * Health check endpoint for monitoring
 * Used by Coolify, Docker, and monitoring services
 */
export async function GET() {
  try {
    // Check database connection with Drizzle
    const result = await db.select({ count: sql`1` }).from(sql`(SELECT 1) AS dummy`)
    
    // Return healthy status
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'claude-superplate',
      database: 'connected',
      version: '2.0.0',
    })
  } catch (error) {
    // Return unhealthy status
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'claude-superplate',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}