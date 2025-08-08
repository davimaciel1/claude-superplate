import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/health',
    '/api/webhooks/(.*)',
    '/sign-in',
    '/sign-up',
    '/pricing',
    '/blog',
    '/blog/(.*)',
    '/docs',
    '/docs/(.*)',
  ],
  ignoredRoutes: [
    '/api/health',
    '/api/webhooks/(.*)',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}