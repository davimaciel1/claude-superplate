'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: 'Up to 3 projects', included: true },
      { name: '1 team member', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Community support', included: true },
      { name: 'API access', included: false },
      { name: 'Custom domain', included: false },
      { name: 'Priority support', included: false },
      { name: 'Advanced analytics', included: false },
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Great for growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { name: 'Unlimited projects', included: true },
      { name: 'Up to 10 team members', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'API access', included: true },
      { name: 'Custom domain', included: true },
      { name: 'Webhooks', included: true },
      { name: 'SSO', included: false },
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: 'Unlimited everything', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Custom analytics', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'API access', included: true },
      { name: 'Custom domain', included: true },
      { name: 'Webhooks', included: true },
      { name: 'SSO & SAML', included: true },
      { name: 'SLA guarantee', included: true },
      { name: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="container py-24">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the perfect plan for your needs. Always flexible to scale.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="mt-8 flex items-center justify-center space-x-3">
        <Label htmlFor="billing-toggle" className="text-sm font-medium">
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label htmlFor="billing-toggle" className="text-sm font-medium">
          Yearly
          <Badge variant="secondary" className="ml-2">
            Save 20%
          </Badge>
        </Label>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? 'relative border-primary shadow-lg' : ''}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                {plan.monthlyPrice !== null ? (
                  <>
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">Custom</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.included ? (
                      <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <X className="mr-2 h-5 w-5 shrink-0 text-muted-foreground/50" />
                    )}
                    <span
                      className={
                        feature.included ? '' : 'text-muted-foreground/50'
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-3xl font-bold">Frequently asked questions</h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="text-lg font-semibold">Can I change plans later?</h3>
            <p className="mt-2 text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be
              reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Is there a free trial?</h3>
            <p className="mt-2 text-muted-foreground">
              Yes, all paid plans come with a 14-day free trial. No credit card required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
            <p className="mt-2 text-muted-foreground">
              We accept all major credit cards, debit cards, and PayPal. Enterprise
              customers can also pay by invoice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Can I cancel anytime?</h3>
            <p className="mt-2 text-muted-foreground">
              Yes, you can cancel your subscription at any time. You'll continue to have
              access until the end of your billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}