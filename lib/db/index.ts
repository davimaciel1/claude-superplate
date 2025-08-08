import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get database URL from environment
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error(
      'DATABASE_URL is not defined. Please check your .env.local file.\n' +
      'For development, use Supabase (free): https://supabase.com\n' +
      'For production, Coolify will set this automatically.'
    )
  }
  
  return url
}

// Create the connection
const connectionString = getDatabaseUrl()
const sql = postgres(connectionString)

// Create drizzle instance
export const db = drizzle(sql, { schema })

// Export the schema for use in other files
export { schema }

// Export types
export type Database = typeof db