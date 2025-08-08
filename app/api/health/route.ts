import { NextResponse } from 'next/server'

/**
 * Health check endpoint for monitoring
 * Used by Coolify, Docker, and monitoring services
 */
export async function GET() {
  try {
    // Check if environment variables are set
    const hasDatabase = !!process.env.DATABASE_URL
    const hasClerk = !!process.env.CLERK_SECRET_KEY
    
    // Basic health check without database query
    // Database connection will be tested separately if needed
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'claude-superplate',
      version: '2.0.0',
      checks: {
        environment: process.env.NODE_ENV || 'development',
        database_configured: hasDatabase,
        auth_configured: hasClerk,
      }
    }
    
    // If all critical services are configured, we're healthy
    if (hasDatabase && hasClerk) {
      return NextResponse.json(health)
    } else {
      // Still return 200 but indicate configuration needed
      return NextResponse.json({
        ...health,
        status: 'degraded',
        message: 'Some services not configured'
      })
    }
  } catch (error) {
    // Return unhealthy status
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'claude-superplate',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}