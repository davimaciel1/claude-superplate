import * as z from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional(),
  role: z.enum(["user", "admin", "super_admin"]).default("user"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
})

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  password: z.string().min(8).max(100),
  role: z.enum(["user", "admin", "super_admin"]).default("user"),
})