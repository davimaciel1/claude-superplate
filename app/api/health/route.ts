import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Health check endpoint for monitoring
 * Used by Coolify, Docker, and monitoring services
 */
export async function GET() {
  try {
    // Check database connection
    await db.execute('SELECT 1')
    
    // Return healthy status
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'claude-superplate',
      database: 'connected',
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