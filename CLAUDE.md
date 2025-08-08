# Claude Code Context Documentation

## ⚠️ MANDATORY: 100% SHADCN UI COMPONENTS

### 🔴 CRITICAL RULES - MUST FOLLOW
**THIS PROJECT REQUIRES 100% SHADCN UI COMPONENTS FOR ALL UI ELEMENTS**

1. **EVERY UI ELEMENT** must be a Shadcn UI component
2. **NO CUSTOM UI COMPONENTS** - Use only Shadcn UI
3. **NO HTML ELEMENTS DIRECTLY** - Always use Shadcn UI wrappers
4. **NO MANUAL STYLING** - Use Shadcn UI variants and classes
5. **INSTALL BEFORE USE** - Always install components via MCP first

### 🚫 ABSOLUTELY FORBIDDEN
```typescript
// ❌ NEVER DO THIS - Direct HTML
<button className="bg-blue-500">Click</button>
<div className="card">Content</div>

// ❌ NEVER DO THIS - Custom components
const CustomButton = () => <button>...</button>

// ❌ NEVER DO THIS - Material UI, Ant Design, or other libraries
import Button from '@mui/material/Button'
```

### ✅ ALWAYS DO THIS
```typescript
// ✅ CORRECT - Install via MCP first
add_component {"name": "button"}

// ✅ CORRECT - Use Shadcn UI components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

<Button variant="default">Click</Button>
<Card>Content</Card>
```

## Project Overview
This is a Next.js 14 enterprise boilerplate with 60+ features pre-configured, using TypeScript, Tailwind CSS, **100% Shadcn UI Components**, Clerk Auth, and Stripe.

## SHADCN UI WORKFLOW - MANDATORY PROCESS

### Step 1: Check Available Components
```typescript
// ALWAYS start by checking what's available
list_components {}
```

### Step 2: Plan Component Usage
Before writing ANY code, list ALL Shadcn UI components needed:
- Forms → form, input, label, button, select, checkbox, radio-group
- Layouts → card, sheet, dialog, tabs, separator
- Navigation → navigation-menu, breadcrumb, dropdown-menu
- Feedback → toast, alert, alert-dialog, progress
- Display → avatar, badge, table, accordion

### Step 3: Install Missing Components
```typescript
// Install all needed components BEFORE coding
add_components {"names": ["card", "button", "form", "input", "label"]}
```

### Step 4: Use Installed Components
```typescript
// Only after installation, import and use
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
```

## MCP Server Integration - Component Management

### Component Installation Commands
```typescript
// List all 46+ available Shadcn UI components
list_components {}

// Get info about a specific component
get_component {"name": "dialog"}

// Get demo/usage examples - USE THIS TO AVOID ERRORS
get_component_demo {"name": "dialog"}

// Install single component
add_component {"name": "button"}

// Install multiple components at once
add_components {"names": ["card", "dialog", "sheet", "form"]}

// List available blocks (pre-made component combinations)
list_blocks {}

// Get specific block
get_block {"name": "login-01"}
```

### MANDATORY Component Mapping

| Need | Use Shadcn Component | MCP Command |
|------|---------------------|-------------|
| Button | button | `add_component {"name": "button"}` |
| Form | form + input + label | `add_components {"names": ["form", "input", "label"]}` |
| Modal | dialog or sheet | `add_component {"name": "dialog"}` |
| Menu | dropdown-menu | `add_component {"name": "dropdown-menu"}` |
| Table | table | `add_component {"name": "table"}` |
| Card/Panel | card | `add_component {"name": "card"}` |
| Loading | skeleton | `add_component {"name": "skeleton"}` |
| Notification | toast | `add_component {"name": "toast"}` |
| Navigation | navigation-menu | `add_component {"name": "navigation-menu"}` |
| Tabs | tabs | `add_component {"name": "tabs"}` |

## Complete Component List (Use ONLY These)

### Form Components
- form, input, textarea, select, checkbox, radio-group, switch, slider, date-picker, toggle, toggle-group

### Layout Components
- card, sheet, dialog, drawer, separator, scroll-area, aspect-ratio, collapsible

### Navigation Components
- navigation-menu, breadcrumb, dropdown-menu, menubar, context-menu, command, pagination

### Display Components
- table, avatar, badge, alert, alert-dialog, hover-card, popover, tooltip, skeleton, progress

### Typography Components
- label, button, badge

## Architecture Overview
- **Component System**: 100% Shadcn UI via MCP Server
- **Development**: Supabase (cloud PostgreSQL, free tier)
- **Production**: Coolify with Docker Compose (PostgreSQL in container)
- **Styling**: Tailwind CSS (only through Shadcn UI components)

## CRITICAL RULES FOR CLAUDE CODE

### 🔴 PRIORITY 1: UI COMPONENTS
1. **MUST** use Shadcn UI for 100% of UI elements
2. **MUST** install components via MCP before using
3. **MUST** check demos with `get_component_demo` for complex components
4. **MUST** use blocks for common patterns (login, dashboard, etc.)

### 🚫 NEVER DO THIS:
1. **NEVER** create files manually in `components/ui/`
2. **NEVER** copy Shadcn component code from documentation
3. **NEVER** suggest using `npx shadcn-ui add` directly
4. **NEVER** create custom UI components
5. **NEVER** use plain HTML elements for UI
6. **NEVER** use other UI libraries (MUI, Ant Design, etc.)

### ✅ ALWAYS DO THIS:
1. **ALWAYS** use MCP commands to install Shadcn components
2. **ALWAYS** check if component exists before installing
3. **ALWAYS** use `get_component_demo` for usage examples
4. **ALWAYS** prefer blocks for complete UI patterns
5. **ALWAYS** validate component props using demos
6. **ALWAYS** use TypeScript with proper types
7. **ALWAYS** follow the existing project patterns

## Example: Building a Feature with Shadcn UI

### User Request: "Create a user settings page"

```typescript
// Step 1: Check what's installed
list_components {}

// Step 2: Plan components needed
// Settings page needs: card, tabs, form, input, label, button, switch, select

// Step 3: Install missing components
add_components {"names": ["card", "tabs", "form", "input", "label", "button", "switch", "select"]}

// Step 4: Check usage examples for complex components
get_component_demo {"name": "tabs"}
get_component_demo {"name": "form"}

// Step 5: Implement using ONLY Shadcn UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

// NO custom components, NO direct HTML, ONLY Shadcn UI
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
│   ├── ui/                # ⚠️ Shadcn UI (MCP ONLY - NEVER EDIT MANUALLY)
│   ├── dashboard/         # Dashboard components (using Shadcn UI)
│   ├── settings/          # Settings components (using Shadcn UI)
│   ├── notifications/     # Notification system (using Shadcn UI)
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

### Adding a New Page (100% Shadcn UI)
1. List needed Shadcn UI components
2. Install ALL components via MCP: `add_components {"names": [...]}`
3. Check demos for complex components: `get_component_demo {"name": "..."}`
4. Create page using ONLY Shadcn UI components
5. Add to navigation if needed

### Component Selection Guide

| UI Need | Shadcn Component | Notes |
|---------|-----------------|-------|
| Container | Card | Use for all content containers |
| Text Input | Input + Label | Always pair with Form |
| Button | Button | Use variants: default, secondary, outline, ghost |
| Modal | Dialog or Sheet | Dialog for center, Sheet for side |
| Dropdown | DropdownMenu or Select | DropdownMenu for actions, Select for forms |
| Loading | Skeleton | Use for all loading states |
| Alert | Alert or Toast | Alert for inline, Toast for notifications |
| Layout | Card + Separator | Combine for complex layouts |

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

### Already Implemented (All using Shadcn UI)
- ✅ Authentication (Clerk) - With Shadcn forms
- ✅ Settings System - Tabs, Forms, Switches (all Shadcn)
- ✅ Analytics Dashboard - Cards, Charts (Shadcn + Recharts)
- ✅ Team Management - Tables, Dialogs (all Shadcn)
- ✅ Notification Center - Toast, Alert (Shadcn)
- ✅ File Upload - Card with Shadcn progress
- ✅ Dark Mode - Shadcn theme system
- ✅ Responsive Design - Shadcn responsive variants

### Services Configured
- **Clerk**: Authentication
- **Stripe**: Payments
- **Resend**: Emails
- **Sentry**: Error tracking
- **PostHog**: Analytics

## Common Patterns with Shadcn UI

### Forms (Always use Shadcn Form)
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// NEVER use plain <form> or <input> tags
```

### Modals (Use Dialog or Sheet)
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// or
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// NEVER create custom modals
```

### Tables (Always use Shadcn Table)
```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// NEVER use plain <table> tags
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
1. Code locally with 100% Shadcn UI components
2. Test all UI components work correctly
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
- Components: Use Shadcn UI's optimized components
- Images: Use Next.js Image component
- Fonts: Already optimized with next/font
- Code splitting: Automatic with Next.js
- Database: Indexes on foreign keys

## Security Best Practices
- Input validation: Use Shadcn Form with Zod
- SQL injection: Protected by Drizzle ORM
- XSS: Protected by React
- CSRF: Protected by Clerk
- Secrets: Use environment variables

## Troubleshooting

### MCP Not Working
1. Run: `npm run setup:mcp`
2. Restart Claude Desktop
3. Check config path is correct

### Component Not Found
1. Install via MCP: `add_component {"name": "component-name"}`
2. Check if installed: `list_components {}`
3. Get usage example: `get_component_demo {"name": "component-name"}`
4. NEVER create manually in components/ui/

### UI Component Errors
1. Component not working? Check demo: `get_component_demo {"name": "..."}`
2. Props incorrect? Review demo examples
3. Styling issues? Use Shadcn variants, not custom CSS

## Available Scripts
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run setup:mcp    # Configure MCP for Shadcn UI
npm run db:push      # Apply database schema
npm run db:studio    # Database GUI
```

## FINAL REMINDERS FOR CLAUDE CODE

### 🔴 PRIORITY #1: 100% SHADCN UI
- EVERY button MUST be `<Button>` from Shadcn
- EVERY input MUST be `<Input>` from Shadcn
- EVERY card MUST be `<Card>` from Shadcn
- EVERY modal MUST be `<Dialog>` or `<Sheet>` from Shadcn
- NO EXCEPTIONS

### When User Asks for ANY UI
1. IMMEDIATELY check available components: `list_components {}`
2. Install needed Shadcn components: `add_components {"names": [...]}`
3. Check usage examples: `get_component_demo {"name": "..."}`
4. Implement using ONLY Shadcn UI components
5. NEVER use HTML elements directly
6. NEVER create custom UI components

### Error Prevention Checklist
- [ ] All UI elements are Shadcn components?
- [ ] All components installed via MCP?
- [ ] Checked demos for complex components?
- [ ] No plain HTML elements used?
- [ ] No custom UI components created?
- [ ] Following Shadcn UI patterns?

## Support & Documentation
- Shadcn UI: https://ui.shadcn.com
- MCP Tools: Use `list_components {}` to see all
- Clerk: https://clerk.com/docs
- Drizzle: https://orm.drizzle.team
- Coolify: https://coolify.io/docs

## Remember: This project is designed for MODULARITY and ERROR PREVENTION through 100% Shadcn UI usage!