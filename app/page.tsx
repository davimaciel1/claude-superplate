import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Claude Superplate
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The most complete Next.js boilerplate with 60+ features
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="px-6 py-3 bg-muted text-foreground rounded-md font-medium hover:opacity-90 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">🚀 Ready to Deploy</h3>
            <p className="text-muted-foreground">
              Configured for Coolify with Docker Compose. Push to deploy.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">🔐 Authentication</h3>
            <p className="text-muted-foreground">
              Complete auth system with Clerk. Social logins, 2FA, and more.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">💳 Payments Ready</h3>
            <p className="text-muted-foreground">
              Stripe integration for subscriptions and one-time payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}