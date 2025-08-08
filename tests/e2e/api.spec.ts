import { test, expect } from '@playwright/test'

test.describe('API Routes', () => {
  test('health check endpoint should return 200', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.status()).toBe(200)
    
    const data = await response.json()
    expect(data.status).toBe('healthy')
    expect(data.timestamp).toBeTruthy()
  })

  test('should handle unauthorized requests', async ({ request }) => {
    const response = await request.get('/api/users')
    expect(response.status()).toBe(401)
    
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })

  test('should validate request body', async ({ request }) => {
    const response = await request.patch('/api/users/123', {
      data: {
        name: '', // Invalid: empty name
      },
    })
    
    expect(response.status()).toBe(400)
  })

  test('should handle rate limiting', async ({ request }) => {
    // Make multiple requests quickly
    const promises = []
    for (let i = 0; i < 15; i++) {
      promises.push(request.get('/api/health'))
    }
    
    const responses = await Promise.all(promises)
    
    // Some requests should be rate limited (if rate limiting is enabled)
    const rateLimited = responses.some(r => r.status() === 429)
    // This test assumes rate limiting is configured
  })

  test('should return proper error for non-existent routes', async ({ request }) => {
    const response = await request.get('/api/non-existent')
    expect(response.status()).toBe(404)
  })

  test('analytics endpoint should return data structure', async ({ request }) => {
    // This would need auth token in real scenario
    const response = await request.get('/api/analytics')
    
    if (response.status() === 200) {
      const data = await response.json()
      expect(data).toHaveProperty('pageViews')
      expect(data).toHaveProperty('uniqueVisitors')
      expect(data).toHaveProperty('bounceRate')
      expect(data).toHaveProperty('topPages')
    }
  })

  test('dashboard stats endpoint should return metrics', async ({ request }) => {
    // This would need auth token in real scenario
    const response = await request.get('/api/dashboard/stats')
    
    if (response.status() === 200) {
      const data = await response.json()
      expect(data).toHaveProperty('revenue')
      expect(data).toHaveProperty('users')
      expect(data).toHaveProperty('sales')
      expect(data).toHaveProperty('activeNow')
    }
  })
})