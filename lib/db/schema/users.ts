import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { organizations, organizationMembers } from './organizations'

export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'super_admin'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: userRoleEnum('role').default('user'),
  metadata: text('metadata').$type<Record<string, any>>().default('{}'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  organizations: many(organizations),
  memberships: many(organizationMembers),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert