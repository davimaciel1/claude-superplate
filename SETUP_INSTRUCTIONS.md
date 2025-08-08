# ⚙️ Setup Instructions - Claude Superplate v2.0

## 🚀 Quick Start

### Step 1: Clone and Install
```bash
git clone https://github.com/davimaciel1/claude-superplate my-app
cd my-app
npm install
```

### Step 2: Setup MCP for Claude
```bash
npm run setup:mcp
# Restart Claude Desktop after this
```

### Step 3: Install UI Components via MCP

**IMPORTANT**: Components must be installed via MCP in Claude!

In Claude, run these commands to install the necessary components:

```
# Install all required components
add_components {"names": [
  "accordion", "alert", "alert-dialog", "avatar", "badge",
  "breadcrumb", "button", "calendar", "card", "checkbox",
  "collapsible", "command", "dialog", "dropdown-menu",
  "form", "hover-card", "input", "label", "navigation-menu",
  "popover", "progress", "radio-group", "scroll-area",
  "select", "separator", "sheet", "skeleton", "slider",
  "switch", "table", "tabs", "textarea", "toast",
  "toggle", "tooltip"
]}
```

### Step 4: Setup Database (Supabase)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project (free)
3. Go to Settings > Database
4. Copy connection string
5. Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
```

### Step 5: Setup Authentication (Clerk)

1. Create account at [clerk.com](https://clerk.com)
2. Create application
3. Copy keys to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### Step 6: Initialize Database

```bash
npm run db:push
```

### Step 7: Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Important Notes

1. **UI Components**: ALWAYS install via MCP, never create manually
2. **Database**: Use Supabase for dev, Docker PostgreSQL for production
3. **Settings/Team Pages**: Will only work after installing UI components
4. **File Upload**: Requires `react-dropzone` (already in package.json)

## 🚨 Common Issues

### "Cannot find module '@/components/ui/..."
- Install the component via MCP: `add_component {"name": "component-name"}`

### "DATABASE_URL is not defined"
- Create `.env.local` and add your Supabase URL

### "Clerk keys invalid"
- Make sure you're using test keys for development

## 🚀 Deploy to Production

See [docs/COOLIFY_DEPLOY.md](docs/COOLIFY_DEPLOY.md) for production deployment.