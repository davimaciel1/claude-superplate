import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Claude Superplate/)
})

test('can navigate to pricing', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Pricing')
  await expect(page).toHaveURL('/pricing')
})