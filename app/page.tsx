import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <Card className="border-0 bg-transparent shadow-none text-center mb-12">
          <CardHeader>
            <CardTitle className="text-4xl md:text-6xl font-bold">
              Claude Superplate
            </CardTitle>
            <CardDescription className="text-xl mt-4">
              The most complete Next.js boilerplate with 60+ features
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Ready to Deploy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Configured for Coolify with Docker Compose. Push to deploy.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔐</span>
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete auth system with Clerk. Social logins, 2FA, and more.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💳</span>
                Payments Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stripe integration for subscriptions and one-time payments.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}