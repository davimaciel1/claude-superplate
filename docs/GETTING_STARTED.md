# 📝 Getting Started Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose (for local development)
- A code editor (VS Code recommended)

## Quick Start

### 1. Use as GitHub Template (Recommended)

1. Click the "Use this template" button on GitHub
2. Name your repository
3. Clone your new repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
cd YOUR_REPO_NAME
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment variables file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

- **Clerk**: Get keys from [dashboard.clerk.com](https://dashboard.clerk.com)
- **Stripe**: Get keys from [dashboard.stripe.com](https://dashboard.stripe.com)
- **Resend**: Get API key from [resend.com](https://resend.com)

### 4. Database Setup

Start the database with Docker:

```bash
docker-compose up -d
```

Run database migrations:

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── (marketing)/       # Public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
├── styles/               # Global styles
├── public/               # Static assets
└── docker/               # Docker configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript
- `npm run test` - Run tests
- `npm run e2e` - Run E2E tests
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

## Customization

### Adding Shadcn Components

```bash
npx shadcn-ui@latest add [component-name]
```

### Changing Theme

Edit `app/globals.css` to customize colors and theme variables.

### Adding New Pages

Create new files in the `app/` directory following Next.js App Router conventions.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davimaciel1/claude-superplate)

### Deploy with Docker

Build and run with Docker:

```bash
docker-compose up --build
```

### Deploy to Coolify

1. Add new project in Coolify
2. Select "Docker Compose"
3. Point to your GitHub repository
4. Coolify will auto-detect `docker-compose.yml`
5. Configure environment variables
6. Deploy!

## Troubleshooting

### Database Connection Issues

Make sure Docker is running and PostgreSQL container is up:

```bash
docker-compose ps
docker-compose logs postgres
```

### Authentication Not Working

Verify Clerk environment variables are set correctly:

```bash
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY
```

### Build Errors

Clear cache and reinstall dependencies:

```bash
rm -rf node_modules .next
npm install
npm run dev
```

## Need Help?

- 📚 [Documentation](https://github.com/davimaciel1/claude-superplate/docs)
- 💬 [Discussions](https://github.com/davimaciel1/claude-superplate/discussions)
- 🐛 [Report Issues](https://github.com/davimaciel1/claude-superplate/issues)
