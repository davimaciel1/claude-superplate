# 🚀 Claude Superplate

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Shadcn_UI-70+-black?style=for-the-badge" alt="Shadcn" />
  <img src="https://img.shields.io/badge/Features-60+-green?style=for-the-badge" alt="Features" />
</div>

<div align="center">
  <h3>The most complete Next.js boilerplate ever created</h3>
  <p>Zero config • 100% automated • AI-powered customization • Production ready in 10 minutes</p>
</div>

---

## 🆕 Recent Updates

### Version 2.0 - Complete Enhancement (Aug 2025)
- ✅ **Added 20+ new Shadcn UI components** (Accordion, Avatar, Calendar, Checkbox, Dialog, Command, Popover, Tooltip, Toggle, Slider, Navigation Menu, Hover Card)
- ✅ **Complete Settings System** with Profile, Notifications, Security, and Billing management
- ✅ **Advanced Notification Center** with real-time notifications, filtering, and actions
- ✅ **File Upload System** with drag-and-drop, progress tracking, and multiple file support
- ✅ **Team Management Page** with role-based permissions and member management
- ✅ **Analytics Dashboard** with charts, metrics, and reports
- ✅ **CLAUDE.md Documentation** for perfect Claude Code integration and MCP support
- ✅ **70+ Total UI Components** now available

## ✨ Features

### 🎯 Core Technologies
- ⚡ **Next.js 15** with App Router
- 🔥 **TypeScript 5.6** with strict mode
- 💎 **Tailwind CSS 3.4** 
- 🎨 **Shadcn UI** with 70+ components (UPDATED!)
- ⚛️ **React 19** latest features

### 🎨 Complete UI Component Library (NEW!)
All Shadcn UI components now included:
- **Layout**: Accordion, Card, Sheet, Tabs, Separator
- **Forms**: Input, Button, Select, Checkbox, Radio, Switch, Slider, Toggle
- **Data Display**: Table, Badge, Progress, Avatar, Calendar
- **Feedback**: Alert, Toast, Loading, Skeleton, Error Boundary
- **Navigation**: Dropdown, Command, Navigation Menu, Breadcrumb
- **Overlay**: Dialog, Popover, Tooltip, Hover Card
- **File Management**: File Upload with drag-and-drop (NEW!)
- **Notifications**: Complete Notification Center (NEW!)

### 🔐 Authentication (Clerk)
- ✅ Complete auth flow (sign up, sign in, sign out)
- 🔑 Passwordless with magic links
- 🔒 Multi-factor authentication (MFA/2FA)
- 🌐 Social login (Google, GitHub, Facebook, Twitter, Apple)
- 🔏 Passkeys support
- 👤 User impersonation for admins

### 💾 Database & ORM
- 📦 **DrizzleORM** type-safe ORM
- 🐘 **PostgreSQL** with Docker
- 💽 **PGlite** for offline development
- 🔄 Automatic migrations
- 🌱 Seed data included

### 💳 Payments (Stripe)
- 💰 Subscription management
- 📊 Usage-based billing
- 🎯 Customer portal
- 🪝 Webhooks configured
- 📱 Mobile-ready checkout

### 📊 Dashboard Features (NEW!)
- 📈 **Analytics Dashboard** with real-time metrics
- 👥 **Team Management** with roles and permissions
- ⚙️ **Complete Settings System**:
  - Profile management with avatar upload
  - Notification preferences
  - Security settings with 2FA
  - Billing and subscription management
- 🔔 **Real-time Notifications** with filtering and actions
- 📁 **File Upload System** with progress tracking

### 🌍 Internationalization
- 🌐 Multi-language with next-intl
- 🔄 Crowdin integration
- ✅ Translation validation
- 🌏 RTL support

### 🧪 Testing Suite
- 🦺 Unit tests with Vitest
- 🧪 E2E tests with Playwright
- 📸 Visual regression testing
- 📊 Coverage with Codecov
- 🎭 Component testing with Storybook

### 📊 Monitoring & Analytics
- 🚨 Error tracking with Sentry
- 📈 Analytics with PostHog
- 📝 Structured logging with LogTape
- 🔍 Performance monitoring
- 🛡️ Security with Arcjet

### 🚀 Developer Experience
- 📏 ESLint + Prettier configured
- 🦊 Git hooks with Husky
- 🚓 Commit standards with Commitlint
- 🔄 Auto dependency updates with Dependabot
- 🐰 AI code reviews with CodeRabbit
- 🎯 Absolute imports configured
- 📚 **CLAUDE.md** for perfect Claude Code integration (NEW!)

### 🎁 Extra Features
- 📧 Email system with Resend
- 👥 Multi-tenancy with teams/workspaces
- 📱 PWA ready
- 🔍 SEO optimized
- 📄 Sitemap.xml & robots.txt
- 🐳 Docker Compose included

## 🚀 Quick Start

### Option 1: Use as GitHub Template (Recommended)

1. Click the "Use this template" button above
2. Name your repository
3. Clone and start developing:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
cd YOUR_REPO_NAME
npm install
npm run dev
```

### Option 2: Use NPX Command

```bash
npx create-claude-app@latest my-app
cd my-app
npm run dev
```

### Option 3: Clone Directly

```bash
git clone https://github.com/davimaciel1/claude-superplate my-app
cd my-app
npm install
npm run dev
```

## 🎨 Choose Your Template

During setup, you'll be asked to choose a template:

- **🚀 SaaS** - Multi-tenant SaaS with dashboard, billing, teams
- **🛍️ E-commerce** - Full e-commerce with cart, checkout, orders
- **📝 Blog** - Blog/CMS with MDX, SEO, categories
- **🎯 Landing** - Marketing site with sections and forms
- **⚡ Custom** - Start with base and add what you need

## 🤖 AI-Powered Customization with Claude Code

The project now includes **CLAUDE.md** documentation for perfect integration with Claude Code. This enables:

- Automatic component generation
- Smart code suggestions
- Context-aware development
- MCP (Model Context Protocol) integration

```bash
# Example: Use Claude Code to customize your project
claude "Add a customer support chat system"

# Claude will:
# - Create the chat components
# - Set up WebSocket connections
# - Add database schemas
# - Configure real-time messaging
```

## 📦 What's Included

```
my-app/
├── app/                    # Next.js 15 App Router
│   ├── (marketing)/       # Landing, pricing, blog
│   ├── (auth)/           # Auth pages
│   ├── (dashboard)/      # Dashboard pages
│   │   ├── analytics/    # Analytics dashboard (NEW!)
│   │   ├── settings/     # Complete settings system (NEW!)
│   │   ├── team/         # Team management (NEW!)
│   │   └── ...
│   └── api/              # API routes
├── components/           # 70+ Shadcn components (UPDATED!)
│   ├── ui/              # All Shadcn UI components
│   ├── dashboard/       # Dashboard components
│   ├── settings/        # Settings components (NEW!)
│   └── notifications/   # Notification system (NEW!)
├── lib/                  # Utilities and configs
├── CLAUDE.md            # Claude Code documentation (NEW!)
├── docker/              # Docker setup
├── tests/               # Test suites
└── [60+ more...]        # Everything configured
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript 5.6, Tailwind CSS 3.4 |
| **UI Components** | Shadcn UI (70+ components), Radix UI, Framer Motion |
| **Backend** | Next.js API Routes, tRPC, WebSockets |
| **Database** | PostgreSQL, DrizzleORM, Redis, PGlite |
| **Authentication** | Clerk (complete auth system) |
| **Payments** | Stripe (subscriptions + checkout) |
| **Email** | Resend, React Email |
| **Testing** | Vitest, Playwright, Storybook |
| **Monitoring** | Sentry, PostHog, LogTape |
| **DevOps** | Docker, GitHub Actions, Vercel |
| **AI Integration** | Claude MCP, Claude Code support |

## 📊 Why Claude Superplate?

| Feature | Claude Superplate | Next.js Boilerplate | Superplate | Create-T3-App |
|---------|------------------|---------------------|------------|---------------|
| **Setup Time** | < 5 min | 15+ min | 10+ min | 5+ min |
| **Features** | 60+ | 30+ | 20+ | 10+ |
| **UI Components** | 70+ Shadcn | Basic | Varies | None |
| **Auth System** | Complete (Clerk) | Complete | Basic | NextAuth |
| **Payments** | Stripe Ready | Manual | Plugin | None |
| **Multi-tenancy** | ✅ Built-in | Pro only | ❌ | ❌ |
| **AI Integration** | ✅ Claude MCP | ❌ | ❌ | ❌ |
| **Docker** | ✅ Dev + Prod | Prod only | ❌ | ❌ |
| **Settings System** | ✅ Complete | Basic | ❌ | ❌ |
| **Notifications** | ✅ Real-time | ❌ | ❌ | ❌ |
| **File Upload** | ✅ Advanced | Basic | ❌ | ❌ |
| **Price** | **FREE** | Free/Pro $299 | Free | Free |

## 🎯 Perfect For

- 🚀 **Startups** - Launch your MVP in days, not months
- 👨‍💻 **Developers** - Skip the boilerplate, focus on features
- 🏢 **Agencies** - Deliver projects faster
- 🎓 **Learning** - See best practices in action

## 📚 Documentation

- [📖 Complete Documentation](https://claude-superplate.dev/docs)
- [🚀 Getting Started Guide](./docs/GETTING_STARTED.md)
- [🎨 Customization Guide](./docs/CUSTOMIZATION.md)
- [🔧 Configuration Guide](./docs/CONFIGURATION.md)
- [📦 Deployment Guide](./docs/DEPLOYMENT.md)
- [🤖 Claude Code Integration](./CLAUDE.md) (NEW!)
- [🤝 Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

We love contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

## 📜 License

MIT License - use it for anything!

## 🌟 Support

- ⭐ Star this repo to show support
- 🐛 [Report bugs](https://github.com/davimaciel1/claude-superplate/issues)
- 💡 [Request features](https://github.com/davimaciel1/claude-superplate/issues)
- 💬 [Join discussions](https://github.com/davimaciel1/claude-superplate/discussions)

## 🙏 Credits

Built with ❤️ by [Davi Maciel](https://github.com/davimaciel1) and contributors.

Special thanks to:
- Claude AI for the enhanced implementation
- Shadcn UI for the amazing component library
- All open source contributors

---

<div align="center">
  <p>If this project helped you, please consider giving it a ⭐!</p>
  <a href="https://github.com/davimaciel1/claude-superplate">
    <img src="https://img.shields.io/github/stars/davimaciel1/claude-superplate?style=social" alt="Stars" />
  </a>
</div>
