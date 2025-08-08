# 🚀 Claude Superplate

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Shadcn_UI-50+-black?style=for-the-badge" alt="Shadcn" />
  <img src="https://img.shields.io/badge/Features-50+-green?style=for-the-badge" alt="Features" />
</div>

<div align="center">
  <h3>The most complete Next.js boilerplate ever created</h3>
  <p>Zero config • 100% automated • AI-powered customization • Production ready in 10 minutes</p>
</div>

---

## ✨ Features

### 🎯 Core Technologies
- ⚡ **Next.js 15** with App Router
- 🔥 **TypeScript 5.6** with strict mode
- 💎 **Tailwind CSS 3.4** 
- 🎨 **Shadcn UI** with 50+ components
- ⚛️ **React 19** latest features

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

## 🤖 AI-Powered Customization

Use Claude Code to automatically customize your project:

```bash
# Example: Personalize for your business
claude "My SaaS is a task management tool for remote teams"

# Claude will:
# - Update all landing page copy
# - Customize dashboard for your use case
# - Generate appropriate data models
# - Configure relevant integrations
```

## 📦 What's Included

```
my-app/
├── app/                    # Next.js 15 App Router
│   ├── (marketing)/       # Landing, pricing, blog
│   ├── (auth)/           # Auth pages
│   ├── (dashboard)/      # Dashboard pages
│   └── api/              # API routes
├── components/           # 50+ Shadcn components
├── lib/                  # Utilities and configs
├── docker/              # Docker setup
├── tests/               # Test suites
└── [50+ more...]        # Everything configured
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript 5.6, Tailwind CSS 3.4 |
| **UI Components** | Shadcn UI (50+ components), Radix UI, Framer Motion |
| **Backend** | Next.js API Routes, tRPC, WebSockets |
| **Database** | PostgreSQL, DrizzleORM, Redis, PGlite |
| **Authentication** | Clerk (complete auth system) |
| **Payments** | Stripe (subscriptions + checkout) |
| **Email** | Resend, React Email |
| **Testing** | Vitest, Playwright, Storybook |
| **Monitoring** | Sentry, PostHog, LogTape |
| **DevOps** | Docker, GitHub Actions, Vercel |

## 📊 Why Claude Superplate?

| Feature | Claude Superplate | Next.js Boilerplate | Superplate | Create-T3-App |
|---------|------------------|---------------------|------------|---------------|
| **Setup Time** | < 5 min | 15+ min | 10+ min | 5+ min |
| **Features** | 50+ | 30+ | 20+ | 10+ |
| **UI Components** | 50+ Shadcn | Basic | Varies | None |
| **Auth System** | Complete (Clerk) | Complete | Basic | NextAuth |
| **Payments** | Stripe Ready | Manual | Plugin | None |
| **Multi-tenancy** | ✅ Built-in | Pro only | ❌ | ❌ |
| **AI Integration** | ✅ Claude MCP | ❌ | ❌ | ❌ |
| **Docker** | ✅ Dev + Prod | Prod only | ❌ | ❌ |
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

Inspired by:
- [Next.js Boilerplate](https://github.com/ixartz/Next-js-Boilerplate)
- [Superplate](https://github.com/pankod/superplate)
- [Create T3 App](https://create.t3.gg/)

---

<div align="center">
  <p>If this project helped you, please consider giving it a ⭐!</p>
  <a href="https://github.com/davimaciel1/claude-superplate">
    <img src="https://img.shields.io/github/stars/davimaciel1/claude-superplate?style=social" alt="Stars" />
  </a>
</div>
