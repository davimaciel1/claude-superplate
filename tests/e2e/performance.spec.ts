import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have optimized images', async ({ page }) => {
    await page.goto('/')
    
    // Check for next/image optimization
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const src = await img.getAttribute('src')
      
      // Images should use Next.js image optimization
      if (src && !src.startsWith('data:')) {
        expect(src).toMatch(/\/_next\/image/)
      }
    }
  })

  test('should lazy load non-critical resources', async ({ page }) => {
    await page.goto('/')
    
    // Check for lazy loading attributes
    const lazyImages = page.locator('img[loading="lazy"]')
    const lazyCount = await lazyImages.count()
    
    // Some images should be lazy loaded
    expect(lazyCount).toBeGreaterThan(0)
  })

  test('should have proper caching headers', async ({ page }) => {
    const response = await page.goto('/')
    const headers = response?.headers()
    
    // Check for caching headers
    expect(headers?.['cache-control']).toBeTruthy()
  })

  test('should minimize JavaScript bundle size', async ({ page }) => {
    const coverage = await page.coverage.startJSCoverage()
    await page.goto('/')
    const jsCoverage = await page.coverage.stopJSCoverage()
    
    // Calculate total JS size
    let totalBytes = 0
    let usedBytes = 0
    
    for (const entry of jsCoverage) {
      totalBytes += entry.text.length
      for (const range of entry.ranges) {
        usedBytes += range.end - range.start
      }
    }
    
    // Used JS should be more than 50% of total
    const usageRatio = usedBytes / totalBytes
    expect(usageRatio).toBeGreaterThan(0.5)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.renderTime || lastEntry.loadTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
    
    // LCP should be less than 2.5 seconds
    expect(Number(lcp)).toBeLessThan(2500)
  })
})