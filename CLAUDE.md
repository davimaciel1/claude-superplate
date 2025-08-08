# Claude Code Context Documentation

## Project Overview
This is a Next.js 14 enterprise boilerplate with 50+ features pre-configured, using TypeScript, Tailwind CSS, Shadcn UI, Clerk Auth, and Stripe.

## Architecture Decisions

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.6 (strict mode)
- **Styling**: Tailwind CSS 3.4 + Shadcn UI
- **Database**: PostgreSQL with DrizzleORM
- **Auth**: Clerk (complete auth system)
- **Payments**: Stripe
- **Email**: Resend + React Email
- **Testing**: Vitest + Playwright
- **Monitoring**: Sentry + PostHog

### Project Structure
```
/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (marketing)/       # Public marketing pages
│   ├── api/               # API routes
│   └── onboarding/        # User onboarding flow
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── dashboard/         # Dashboard-specific components
│   └── providers/         # React context providers
├── lib/
│   ├── api/              # API utilities
│   ├── db/               # Database configuration
│   ├── email/            # Email templates
│   ├── shadcn-mcp/       # Shadcn MCP integration
│   └── validations/      # Zod schemas
├── hooks/                 # Custom React hooks
├── templates/            # Page templates
├── tests/                # Test files
└── docker/               # Docker configuration
```

## Development Guidelines

### Component Creation
1. Use Shadcn UI components when possible: `npx shadcn-ui@latest add [component]`
2. Place new components in appropriate directories
3. Follow the existing naming conventions (kebab-case for files)
4. Always use TypeScript with proper types

### State Management
- Use React hooks for local state
- Use Zustand for global state (already installed)
- Use React Query for server state

### Database Operations
- Use DrizzleORM for all database operations
- Migrations: `npm run db:generate` then `npm run db:push`
- View database: `npm run db:studio`

### API Routes
- Place API routes in `app/api/`
- Use Next.js Route Handlers
- Always validate input with Zod schemas from `lib/validations/`

### Authentication
- Clerk handles all authentication
- Protected routes use Clerk middleware
- User data available via Clerk hooks

### Styling
- Use Tailwind CSS utility classes
- Custom styles in `app/globals.css`
- Theme variables in CSS custom properties
- Dark mode supported via next-themes

## Common Tasks

### Add a new page
```typescript
// app/(dashboard)/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}
```

### Add a new API endpoint
```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Implementation
  return NextResponse.json({ data: 'response' })
}
```

### Add a new database table
```typescript
// lib/db/schema/new-table.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const newTable = pgTable('new_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

## Environment Variables
Required environment variables (see .env.example):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `RESEND_API_KEY` - Resend API key

## Testing Strategy
- Unit tests: `npm run test`
- E2E tests: `npm run e2e`
- Type checking: `npm run type-check`
- Linting: `npm run lint`

## Deployment
- Optimized for Vercel deployment
- Docker support for self-hosting
- Environment variables must be set in production

## Performance Considerations
- Images optimized with Next.js Image component
- Lazy loading implemented
- Code splitting automatic with Next.js
- Database queries optimized with proper indexes

## Security Best Practices
- All user input validated with Zod
- CSRF protection via Clerk
- SQL injection prevented by DrizzleORM
- XSS protection built into React
- Environment variables for secrets

## MCP Integration for Shadcn UI

### Installation
The Shadcn MCP client is already integrated in `lib/shadcn-mcp/`. 

To install the MCP server for Claude Code:
```bash
npx @shadcn/ui-mcp init
```

### Available MCP Commands
- `add-component [name]` - Add a Shadcn component
- `list-components` - List available components
- `update-component [name]` - Update a component
- `check-dependencies` - Check component dependencies

## Troubleshooting

### Database connection issues
1. Ensure Docker is running: `docker-compose up -d`
2. Check logs: `docker-compose logs postgres`
3. Reset database: `npm run db:push`

### Build errors
1. Clear cache: `rm -rf .next node_modules`
2. Reinstall: `npm install`
3. Check TypeScript: `npm run type-check`

### Authentication issues
1. Verify Clerk keys in `.env.local`
2. Check Clerk dashboard for domain configuration
3. Clear cookies and local storage

## Code Quality Standards
- Follow ESLint rules (configured)
- Use Prettier for formatting
- Commit messages follow Conventional Commits
- All code must pass TypeScript strict mode
- Write tests for new features

## Contact & Support
- GitHub Issues for bug reports
- Discussions for questions
- Pull requests welcome (see CONTRIBUTING.md)