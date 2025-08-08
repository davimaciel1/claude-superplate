# Claude Code Context Documentation

## Project Overview
This is a Next.js 14 enterprise boilerplate with 50+ features pre-configured, using TypeScript, Tailwind CSS, Shadcn UI (via MCP), Clerk Auth, and Stripe.

## IMPORTANT: Shadcn UI MCP Integration

This project uses the **Shadcn UI MCP Server** for component management. DO NOT create components manually.

### Setting up Shadcn MCP Server

1. **Install the MCP Server globally:**
```bash
npm install -g @shadcn/ui-mcp-server
```

2. **Configure Claude Desktop:**
Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@shadcn/ui-mcp-server"],
      "cwd": "/path/to/your/project"
    }
  }
}
```

3. **Using MCP Commands in Claude:**
Once configured, you can use these commands:
- `add_component` - Add a Shadcn component
- `add_components` - Add multiple components
- `list_components` - List available components
- `check_dependencies` - Check component dependencies
- `add_dependencies` - Add required dependencies

### Example MCP Usage

```typescript
// To add a component via MCP:
// Use: add_component {"name": "button"}

// To add multiple components:
// Use: add_components {"names": ["dialog", "sheet", "dropdown-menu"]}

// To check what's available:
// Use: list_components {}
```

## Architecture Decisions

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.6 (strict mode)
- **Styling**: Tailwind CSS 3.4 + Shadcn UI (via MCP)
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
│   ├── ui/                # Shadcn UI components (installed via MCP)
│   ├── dashboard/         # Dashboard-specific components
│   └── providers/         # React context providers
├── lib/
│   ├── api/              # API utilities
│   ├── db/               # Database configuration
│   ├── email/            # Email templates
│   └── validations/      # Zod schemas
├── hooks/                 # Custom React hooks
├── templates/            # Page templates
├── tests/                # Test files
└── docker/               # Docker configuration
```

## Development Guidelines

### Component Installation via MCP
**NEVER manually create Shadcn UI components.** Always use the MCP server:

1. **Check available components:**
```bash
# In Claude, use the MCP command:
list_components {}
```

2. **Add a single component:**
```bash
# In Claude, use the MCP command:
add_component {"name": "accordion"}
```

3. **Add multiple components:**
```bash
# In Claude, use the MCP command:
add_components {"names": ["avatar", "badge", "button"]}
```

4. **Check dependencies before adding:**
```bash
# In Claude, use the MCP command:
check_dependencies {"component": "calendar"}
```

### Component Usage After Installation
Once installed via MCP, import and use components:

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

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

## MCP-Specific Commands Reference

### Component Management
- `add_component` - Add a single Shadcn UI component
- `add_components` - Add multiple components at once
- `list_components` - List all available components
- `check_dependencies` - Check if dependencies are installed
- `add_dependencies` - Install required dependencies

### Theme Management
- Components automatically inherit your app's theme
- Modify theme in `app/globals.css`
- Use CSS variables for dynamic theming

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

## Troubleshooting

### MCP Server not working
1. Ensure MCP server is installed: `npm install -g @shadcn/ui-mcp-server`
2. Check Claude Desktop config file location
3. Restart Claude Desktop after config changes
4. Verify project path in config

### Component not installing
1. Check if component exists: `list_components {}`
2. Verify dependencies: `check_dependencies {"component": "name"}`
3. Install dependencies first if needed: `add_dependencies {}`

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

## Important Notes for Claude

When asked to add UI components:
1. ALWAYS use the MCP server commands
2. NEVER manually create component files in components/ui/
3. Check if component exists first with `list_components`
4. Install via `add_component` or `add_components`
5. Only create custom components in other directories

When building features:
1. Use installed Shadcn components from components/ui/
2. Create feature-specific components in appropriate directories
3. Follow the existing patterns in the codebase
4. Always use TypeScript with proper types

## Contact & Support
- GitHub Issues for bug reports
- Discussions for questions
- Pull requests welcome (see CONTRIBUTING.md)