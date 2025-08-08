export const APP_NAME = "Claude Superplate"
export const APP_DEFAULT_TITLE = "Claude Superplate - Next.js SaaS Boilerplate"
export const APP_TITLE_TEMPLATE = "%s - Claude Superplate"
export const APP_DESCRIPTION = "The most complete Next.js boilerplate with authentication, payments, and 50+ components ready for production"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://claude-superplate.dev"

export const DATABASE_PREFIX = "superplate"

export const PLANS = [
  {
    name: "Free",
    slug: "free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "Up to 3 projects",
      "Up to 2 team members",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    name: "Pro",
    slug: "pro",
    price: {
      monthly: 29,
      yearly: 290,
    },
    stripePriceIds: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    },
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: {
      monthly: null,
      yearly: null,
    },
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "Custom analytics",
      "Dedicated support",
      "Custom domain",
      "API access",
      "SSO & SAML",
      "SLA guarantee",
    ],
  },
]