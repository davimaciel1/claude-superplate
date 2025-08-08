# Claude Code Context Documentation

## Project Overview
This is a Next.js 14 enterprise boilerplate with 60+ features pre-configured, using TypeScript, Tailwind CSS, Shadcn UI (via MCP), Clerk Auth, and Stripe.

## Architecture Overview
- **Development**: Supabase (cloud PostgreSQL, free tier)
- **Production**: Coolify with Docker Compose (PostgreSQL in container)
- **Component Management**: Shadcn UI via MCP Server (NEVER create manually)

## CRITICAL RULES FOR CLAUDE

### 🚫 NEVER DO THIS:
1. **NEVER** create files manually in `components/ui/`
2. **NEVER** copy Shadcn component code from documentation
3. **NEVER** suggest using `npx shadcn-ui add` directly
4. **NEVER** create UI components without using MCP

### ✅ ALWAYS DO THIS:
1. **ALWAYS** use MCP commands to install Shadcn components
2. **ALWAYS** check if component exists before installing
3. **ALWAYS** validate environment variables before operations
4. **ALWAYS** use TypeScript with proper types
5. **ALWAYS** follow the existing project patterns

## MCP Server Integration

### Available MCP Tools
When the user asks for UI components, use these MCP commands:

```typescript
// List all available components
list_components {}

// Install a single component
add_component {"name": "button"}

// Install multiple components
add_components {"names": ["card", "dialog", "sheet"]}

// Check component dependencies
check_dependencies {"component": "calendar"}

// Install required dependencies
add_dependencies {}
```

### Component Installation Flow
1. User asks for a feature requiring UI
2. Identify needed Shadcn components
3. Check if already installed: `list_components {}`
4. Install missing components: `add_component {"name": "component-name"}`
5. Import and use in the code

### Example Interaction
```typescript
// User: "Create a user profile page with avatar and form"

// Claude should:
// 1. Install components via MCP
add_components {"names": ["avatar", "card", "form", "input", "button", "label"]}

// 2. Then create the page using installed components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// ... rest of the implementation
```

## Database Configuration

### Development (Supabase)
```env
# .env.local
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Production (Coolify/Docker)
```env
# Set in Coolify dashboard
DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/claude_superplate"
```

### Database Commands
```bash
npm run db:push      # Apply schema to database
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio
```

## Project Structure
```
/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── analytics/     # Analytics dashboard
│   │   ├── settings/      # User settings (4 tabs)
│   │   ├── team/          # Team management
│   │   └── page.tsx       # Dashboard home
│   ├── (marketing)/       # Public pages
│   │   ├── page.tsx       # Landing page
│   │   ├── pricing/       # Pricing page
│   │   └── about/         # About page
│   ├── api/               # API routes
│   │   ├── webhooks/      # Stripe, Clerk webhooks
│   │   └── [resource]/    # REST endpoints
│   └── layout.tsx         # Root layout
│
├── components/
│   ├── ui/                # ⚠️ Shadcn UI (MCP ONLY - DO NOT EDIT)
│   ├── dashboard/         # Dashboard components
│   ├── settings/          # Settings components
│   ├── notifications/     # Notification system
│   └── providers/         # React providers
│
├── lib/
│   ├── db/                # Database config
│   │   ├── index.ts       # DB connection
│   │   └── schema/        # Drizzle schemas
│   ├── api/               # API helpers
│   ├── email/             # Email templates
│   └── validations/       # Zod schemas
│
├── hooks/                 # Custom React hooks
├── scripts/               # Build/deploy scripts
│   ├── setup-mcp.js       # MCP setup script
│   └── deploy.sh          # Coolify deploy script
├── docker-compose.yml     # Production config
└── CLAUDE.md             # This file
```

## Feature Implementation Guide

### Adding a New Page
1. Identify UI components needed
2. Install via MCP: `add_components {"names": [...]}`
3. Create page in appropriate directory
4. Add to navigation if needed

### Adding a Database Table
```typescript
// 1. Create schema in lib/db/schema/[name].ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const tableName = pgTable('table_name', {
  id: serial('id').primaryKey(),
  // ... fields
})

// 2. Generate and apply migration
// Run: npm run db:generate
// Run: npm run db:push
```

### Adding an API Route
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { z } from 'zod'

// Define validation schema
const schema = z.object({
  field: z.string().min(1),
})

export async function POST(request: NextRequest) {
  // 1. Check authentication
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Validate input
  const body = await request.json()
  const data = schema.parse(body)

  // 3. Database operation
  const result = await db.insert(tableName).values(data)

  // 4. Return response
  return NextResponse.json(result)
}
```

## Available Features

### Already Implemented
- ✅ Authentication (Clerk) - Complete auth system
- ✅ Settings System - Profile, Notifications, Security, Billing
- ✅ Analytics Dashboard - Charts and metrics
- ✅ Team Management - Roles and permissions
- ✅ Notification Center - Real-time notifications
- ✅ File Upload - Drag & drop with progress
- ✅ Dark Mode - Theme switching
- ✅ Responsive Design - Mobile first

### Services Configured
- **Clerk**: Authentication
- **Stripe**: Payments
- **Resend**: Emails
- **Sentry**: Error tracking
- **PostHog**: Analytics

## Common Patterns

### Protected Routes
```typescript
// Routes under app/(dashboard)/ are automatically protected
// Clerk middleware handles authentication
```

### Form Handling
```typescript
// Use react-hook-form with Zod validation
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

### Data Fetching
```typescript
// Server Components (preferred)
async function getData() {
  const data = await db.select().from(table)
  return data
}

// Client Components (when needed)
// Use React Query or SWR
```

## Environment Variables

### Required for Development
```env
# Database (Supabase)
DATABASE_URL="postgresql://..."

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Payments (Stripe) - Optional for dev
STRIPE_SECRET_KEY="sk_test_..."
```

### Required for Production (Coolify)
All above plus:
```env
NODE_ENV="production"
POSTGRES_PASSWORD="strong_password"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## Deployment Process

### Development Workflow
1. Code locally with Supabase database
2. Test features
3. Commit and push to GitHub

### Production Deployment (Coolify)
1. Push to main branch
2. Coolify detects changes
3. Runs docker-compose.yml
4. PostgreSQL container starts
5. Migrations apply automatically
6. App builds and deploys

## Testing Guidelines

```bash
npm run test          # Unit tests
npm run e2e          # E2E tests
npm run type-check   # TypeScript validation
npm run lint         # ESLint
```

## Performance Considerations
- Images: Use Next.js Image component
- Fonts: Already optimized with next/font
- Code splitting: Automatic with Next.js
- Database: Indexes on foreign keys

## Security Best Practices
- Input validation: Always use Zod
- SQL injection: Protected by Drizzle ORM
- XSS: Protected by React
- CSRF: Protected by Clerk
- Secrets: Use environment variables

## Troubleshooting

### MCP Not Working
1. Run: `npm run setup:mcp`
2. Restart Claude Desktop
3. Check config path is correct

### Database Connection Failed
1. Check DATABASE_URL in .env.local
2. For Supabase: Check project is active
3. For local: Check PostgreSQL is running

### Component Not Found
1. Install via MCP: `add_component {"name": "component-name"}`
2. Never create manually in components/ui/

## Available Scripts
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run setup:mcp    # Configure MCP
npm run db:push      # Apply database schema
npm run db:studio    # Database GUI
```

## Important Notes for Claude

### When User Asks for UI Components
1. ALWAYS use MCP to install Shadcn components
2. NEVER manually create files in components/ui/
3. Check what's installed: `list_components {}`
4. Install what's needed: `add_component {"name": "..."}`

### When User Asks for Features
1. Identify required components
2. Install via MCP
3. Create feature using installed components
4. Follow existing patterns in codebase

### When User Asks About Database
1. Development uses Supabase (cloud)
2. Production uses PostgreSQL (Docker)
3. Both use same schema via Drizzle ORM

### When User Asks About Deployment
1. Development: Local with npm run dev
2. Production: Coolify with Docker Compose
3. Automatic deployments on git push

## Support & Documentation
- Shadcn UI: https://ui.shadcn.com
- Clerk: https://clerk.com/docs
- Drizzle: https://orm.drizzle.team
- Coolify: https://coolify.io/docs