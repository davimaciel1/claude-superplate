import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.use({
    storageState: 'tests/auth.json', // Assumes authenticated state
  })

  test('should display dashboard overview', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check page title
    await expect(page.locator('h2')).toContainText('Dashboard')
    
    // Check stats cards
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=Active Users')).toBeVisible()
    await expect(page.locator('text=Total Sales')).toBeVisible()
    await expect(page.locator('text=Active Now')).toBeVisible()
    
    // Check tabs
    await expect(page.locator('text=Overview')).toBeVisible()
    await expect(page.locator('text=Analytics')).toBeVisible()
    await expect(page.locator('text=Reports')).toBeVisible()
    await expect(page.locator('text=Notifications')).toBeVisible()
  })

  test('should switch between tabs', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Click Analytics tab
    await page.click('text=Analytics')
    await expect(page.locator('text=Detailed analytics')).toBeVisible()
    
    // Click Reports tab
    await page.click('text=Reports')
    await expect(page.locator('text=Generate and download')).toBeVisible()
    
    // Click Notifications tab
    await page.click('text=Notifications')
    await expect(page.locator('text=Notification Settings')).toBeVisible()
  })

  test('should have working date range selector', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Click date range selector
    const dateSelector = page.locator('button:has-text("Last 30 days")')
    await dateSelector.click()
    
    // Select different range
    await page.click('text=Last 7 days')
    
    // Check if selection changed
    await expect(dateSelector).toContainText('Last 7 days')
  })

  test('should show loading state on refresh', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Click refresh button
    const refreshButton = page.locator('button:has-text("Refresh")')
    await refreshButton.click()
    
    // Should show loading state
    await expect(page.locator('text=Refreshing...')).toBeVisible()
    
    // Should show success toast
    await expect(page.locator('text=Dashboard refreshed')).toBeVisible()
  })

  test('should have collapsible sidebar', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Find collapse button
    const collapseButton = page.locator('button[aria-label="Collapse sidebar"]')
    await collapseButton.click()
    
    // Sidebar should be collapsed
    await expect(page.locator('aside')).toHaveClass(/w-16/)
    
    // Click again to expand
    await collapseButton.click()
    await expect(page.locator('aside')).toHaveClass(/w-64/)
  })

  test('should have responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')
    
    // Desktop sidebar should be hidden
    await expect(page.locator('aside.hidden')).toBeHidden()
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('button[aria-label="Menu"]')
    await expect(mobileMenuButton).toBeVisible()
    
    // Open mobile sidebar
    await mobileMenuButton.click()
    await expect(page.locator('aside')).toBeVisible()
  })
})