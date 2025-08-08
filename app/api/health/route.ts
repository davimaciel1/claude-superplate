import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Health check endpoint para Docker e Coolify
 * Verifica se a aplicação e o banco estão funcionando
 */
export async function GET() {
  try {
    // Verificar conexão com o banco
    await db.execute('SELECT 1')
    
    // Retornar status de saúde
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'claude-superplate',
      database: 'connected',
      environment: process.env.NODE_ENV,
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
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