import type { Config } from 'drizzle-kit'

export default {
  schema: './lib/db/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost/db',
  },
} satisfies Config