import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/Claude Superplate/)
    
    // Check hero section
    await expect(page.locator('h1')).toContainText(/Ship your SaaS/)
    
    // Check navigation links
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('text=Pricing')).toBeVisible()
    await expect(page.locator('text=Blog')).toBeVisible()
    await expect(page.locator('text=Docs')).toBeVisible()
  })

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Pricing')
    
    await expect(page).toHaveURL(/pricing/)
    await expect(page.locator('h1')).toContainText(/Pricing/)
    
    // Check pricing cards
    await expect(page.locator('text=Free')).toBeVisible()
    await expect(page.locator('text=Pro')).toBeVisible()
    await expect(page.locator('text=Enterprise')).toBeVisible()
  })

  test('should have working footer links', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Check footer links
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    // Check social links
    await expect(footer.locator('a[href*="github"]')).toBeVisible()
    await expect(footer.locator('a[href*="twitter"]')).toBeVisible()
  })

  test('should have responsive mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label="Menu"]')
    await expect(menuButton).toBeVisible()
    
    // Click menu button
    await menuButton.click()
    
    // Mobile menu should open
    await expect(page.locator('text=Pricing')).toBeVisible()
    await expect(page.locator('text=Blog')).toBeVisible()
  })
})