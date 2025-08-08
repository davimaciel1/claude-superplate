import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, BarChart3, Code2, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js 15 and optimized for performance',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure by Default',
      description: 'Authentication, authorization, and security best practices',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Ready',
      description: 'Multi-language support with i18n built-in',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics Included',
      description: 'Track user behavior and application performance',
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: 'Developer First',
      description: 'TypeScript, ESLint, Prettier, and testing configured',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI Powered',
      description: 'Integrated with Claude and Shadcn MCP',
    },
  ]

  const techStack = [
    'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Shadcn UI',
    'Clerk Auth', 'Stripe', 'PostgreSQL', 'Drizzle ORM', 'Docker',
    'Sentry', 'PostHog', 'Resend', 'Playwright', 'Vitest'
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Version 1.0.0
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Ship your SaaS
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                {' '}10x faster
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              The most complete Next.js boilerplate with 50+ enterprise features.
              Authentication, payments, database, email, and more. All configured and ready to deploy.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Get Started
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
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build a SaaS
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Stop wasting time on boilerplate. Focus on your unique features.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built with the best tools
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Modern stack, battle-tested technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build your SaaS?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Get started in minutes with our complete boilerplate
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                No credit card required
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                Free forever
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                Open source
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}