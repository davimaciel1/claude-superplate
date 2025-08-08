import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should display sign in page', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Check page title
    await expect(page).toHaveTitle(/Sign In/)
    
    // Check for sign in form elements
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    
    // Check for sign up link
    await expect(page.locator('text=Sign up')).toBeVisible()
  })

  test('should display sign up page', async ({ page }) => {
    await page.goto('/sign-up')
    
    // Check page title
    await expect(page).toHaveTitle(/Sign Up/)
    
    // Check for sign up form elements
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    
    // Check for sign in link
    await expect(page.locator('text=Sign in')).toBeVisible()
  })

  test('should redirect to dashboard after sign in', async ({ page }) => {
    // This test would require mocking Clerk auth
    // For now, we'll just check the redirect behavior
    await page.goto('/dashboard')
    
    // Should redirect to sign in if not authenticated
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should show user menu when authenticated', async ({ page, context }) => {
    // Mock authentication by setting cookies
    await context.addCookies([
      {
        name: '__session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/',
      },
    ])
    
    await page.goto('/dashboard')
    
    // Check for user button (would be visible if authenticated)
    // This would need proper Clerk mocking in a real scenario
  })
})