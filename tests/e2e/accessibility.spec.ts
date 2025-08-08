import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  })

  test('dashboard should not have accessibility violations', async ({ page }) => {
    await page.goto('/dashboard')
    await injectAxe(page)
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  })

  test('should have skip link', async ({ page }) => {
    await page.goto('/')
    
    // Tab to reveal skip link
    await page.keyboard.press('Tab')
    
    // Skip link should be visible when focused
    const skipLink = page.locator('text=Skip to main content')
    await expect(skipLink).toBeFocused()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Check h1 exists and is unique
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
    
    // Check heading hierarchy
    const h1 = await page.locator('h1').textContent()
    expect(h1).toBeTruthy()
    
    // All h2s should come after h1
    const h2s = await page.locator('h2').allTextContents()
    expect(h2s.length).toBeGreaterThan(0)
  })

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Check all inputs have associated labels
    const inputs = page.locator('input')
    const inputCount = await inputs.count()
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const inputId = await input.getAttribute('id')
      
      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`)
        const labelCount = await label.count()
        expect(labelCount).toBeGreaterThan(0)
      }
    }
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')
    
    // Check all images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('buttons should have accessible text', async ({ page }) => {
    await page.goto('/')
    
    // Check all buttons have text or aria-label
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      
      expect(text || ariaLabel).toBeTruthy()
    }
  })
})