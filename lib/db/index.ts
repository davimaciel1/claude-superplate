import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Detecta se deve usar PGlite (desenvolvimento) ou PostgreSQL real
const isDevelopment = process.env.NODE_ENV === 'development'
const usePGlite = process.env.USE_PGLITE === 'true'

// Função para obter a conexão do banco
function getDatabase() {
  if (isDevelopment && usePGlite) {
    // Usar PGlite para desenvolvimento local
    console.log('🗄️  Usando PGlite (banco de dados local em arquivo)')
    // PGlite será configurado automaticamente
    const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/claude_superplate_dev'
    const sql = postgres(connectionString)
    return drizzle(sql, { schema })
  } else {
    // Usar PostgreSQL real (local, remoto ou Docker)
    const connectionString = process.env.DATABASE_URL!
    if (!connectionString) {
      throw new Error('DATABASE_URL não está definida no .env.local')
    }
    console.log('🐘 Usando PostgreSQL')
    const sql = postgres(connectionString)
    return drizzle(sql, { schema })
  }
}

export const db = getDatabase()

// Export types
export type Database = typeof db