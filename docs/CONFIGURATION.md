# ⚙️ Configuration Guide

## Environment Variables

### Core Configuration

```env
# Application
NODE_ENV=development|production
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_DESCRIPTION="Your app description"
```

### Authentication (Clerk)

Get your keys from [dashboard.clerk.com](https://dashboard.clerk.com)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

#### Clerk Setup

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Configure authentication methods:
   - Email/Password
   - Social logins (Google, GitHub, etc.)
   - Magic links
   - Passkeys
4. Copy API keys to `.env.local`

### Database (PostgreSQL)

```env
# Local development with Docker
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/superplate

# Production (example with Supabase)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

#### Database Providers

- **Supabase**: Free tier, great for startups
- **Neon**: Serverless Postgres, auto-scaling
- **PlanetScale**: MySQL-compatible, serverless
- **Railway**: Simple deployment, PostgreSQL

### Payments (Stripe)

Get your keys from [dashboard.stripe.com](https://dashboard.stripe.com)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Price IDs from Stripe Dashboard
STRIPE_PRICE_ID_BASIC=price_xxx
STRIPE_PRICE_ID_PRO=price_xxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxx
```

#### Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Create products and prices
3. Setup webhook endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`
4. Copy webhook secret

### Email (Resend)

Get your key from [resend.com](https://resend.com)

```env
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@yourdomain.com
```

#### Email Templates

Located in `emails/` directory:
- `welcome.tsx` - Welcome email
- `reset-password.tsx` - Password reset
- `invoice.tsx` - Invoice/receipt
- `notification.tsx` - General notifications

### Storage (S3/MinIO)

```env
# Local development with MinIO
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_BUCKET_NAME=uploads
S3_REGION=us-east-1

# Production with AWS S3
S3_ACCESS_KEY_ID=AKIAXXXXX
S3_SECRET_ACCESS_KEY=xxxxx
S3_BUCKET_NAME=your-bucket
S3_REGION=us-east-1
```

### Redis Cache

```env
# Local development
REDIS_URL=redis://localhost:6379

# Production with Upstash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### Monitoring

#### Sentry (Error Tracking)

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=xxx
```

#### PostHog (Analytics)

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Feature Flags

```env
# Enable/disable features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_ENABLE_STRIPE=true
NEXT_PUBLIC_ENABLE_EMAIL=true

# Development
NEXT_PUBLIC_SHOW_LOGGER=true
ANALYZE_BUNDLE=false
```

## Next.js Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for Docker
  output: 'standalone',
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minification
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: [
      'localhost',
      'your-domain.com',
      'images.unsplash.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Internationalization
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}
```

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
    }
  }
}
```

## Tailwind Configuration

### tailwind.config.ts

Customize your theme:

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Cal Sans', 'sans-serif'],
      },
    },
  },
}
```

## ESLint Configuration

### .eslintrc.json

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

## Prettier Configuration

### .prettierrc

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

## Docker Configuration

### docker-compose.yml

Customize services:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres
      - redis
```

## Security Configuration

### Content Security Policy

```javascript
// middleware.ts
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https:;
`
```

### Rate Limiting

```javascript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})
```

## Support

- 📚 [Documentation](https://github.com/davimaciel1/claude-superplate)
- 💬 [Discussions](https://github.com/davimaciel1/claude-superplate/discussions)
- 🐛 [Issues](https://github.com/davimaciel1/claude-superplate/issues)
