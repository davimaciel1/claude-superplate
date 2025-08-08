import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get database URL from environment
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  
  if (!url && process.env.NODE_ENV === 'production') {
    throw new Error(
      'DATABASE_URL is not defined in production. Please check your environment variables.'
    )
  }
  
  // Return a dummy URL for build time
  if (!url) {
    console.warn('DATABASE_URL not set, using placeholder for build')
    return 'postgresql://user:pass@localhost:5432/db'
  }
  
  return url
}

// Create the connection
const connectionString = getDatabaseUrl()

// Configure connection options
const sql = postgres(connectionString, {
  ssl: connectionString.includes('supabase.co') ? 'require' : false,
  max: 1, // For serverless environments
  idle_timeout: 20,
  connect_timeout: 10,
})

// Create drizzle instance
export const db = drizzle(sql, { schema })

// Export the schema for use in other files
export { schema }

// Export types
export type Database = typeof db