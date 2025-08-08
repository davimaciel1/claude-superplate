import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, Zap, Shield, Users, BarChart3, Code2, Sparkles } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: 'Authentication Ready',
      description: 'Clerk authentication with social logins, magic links, and more.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built on Next.js 15 with App Router for optimal performance.',
    },
    {
      icon: Users,
      title: 'Multi-tenancy',
      description: 'Organizations and team management built-in from the start.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Beautiful dashboard with charts and metrics out of the box.',
    },
    {
      icon: Code2,
      title: 'Developer Experience',
      description: 'TypeScript, ESLint, Prettier, and testing configured.',
    },
    {
      icon: Sparkles,
      title: 'Modern UI',
      description: '50+ Shadcn UI components with dark mode support.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Claude Superplate</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/docs" className="transition-colors hover:text-foreground/80">
              Documentation
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80">
              Blog
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Next.js 15 + Shadcn UI + Clerk Auth
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ship your SaaS
            <span className="text-primary"> 10x faster</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Production-ready Next.js boilerplate with authentication, payments, database, and 50+ components.
            Start building your SaaS in minutes, not weeks.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com/davimaciel1/claude-superplate">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything you need to build a SaaS</h2>
            <p className="mt-4 text-muted-foreground">
              All the tools and integrations configured and ready to use
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container px-4 py-24 border-t">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Modern Tech Stack</h2>
            <p className="mt-4 text-muted-foreground">
              Built with the latest and greatest technologies
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              'Next.js 15',
              'TypeScript',
              'Tailwind CSS',
              'Shadcn UI',
              'Clerk Auth',
              'Stripe',
              'PostgreSQL',
              'Drizzle ORM',
              'Docker',
              'Resend',
              'React Query',
              'Zod',
            ].map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center rounded-lg border bg-muted/50 p-4 text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-3xl font-bold">Ready to build your SaaS?</h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/90">
              Join thousands of developers who are building their SaaS faster with Claude Superplate.
              Get started in minutes with our production-ready boilerplate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Claude Superplate. All rights reserved.
            </p>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="https://github.com/davimaciel1/claude-superplate" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}