# 🚀 Deployment Guide

## Deployment Options

### 1. Vercel (Recommended)

#### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davimaciel1/claude-superplate)

#### Manual Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run deployment:
```bash
vercel
```

3. Follow the prompts and add environment variables in Vercel dashboard.

### 2. Coolify (Self-Hosted)

#### Prerequisites
- VPS with Coolify installed
- Domain name configured

#### Steps

1. **Add New Resource** in Coolify dashboard
2. **Select Docker Compose** as deployment type
3. **Connect GitHub repository**
4. **Configure environment variables**:
   - Go to Environment Variables tab
   - Add all variables from `.env.example`
5. **Deploy**:
   - Coolify will detect `docker-compose.yml`
   - Click Deploy
   - Wait for build to complete

#### Custom Domain

1. Go to Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   A Record: @ → Your VPS IP
   A Record: www → Your VPS IP
   ```

### 3. Docker (Any VPS)

#### Build and Run

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO
cd YOUR_REPO

# Create .env file
cp .env.example .env
nano .env  # Edit with your values

# Build and start
docker-compose up -d --build
```

#### With Nginx Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

1. Click "Deploy on Railway"
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### 5. Render

1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy

## Environment Variables

### Required Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email (Resend)
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@yourdomain.com
```

### Optional Variables

```env
# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx

# Redis Cache
REDIS_URL=redis://xxx

# S3 Storage
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx
S3_BUCKET_NAME=xxx
```

## Database Setup

### Production Database

#### Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database
3. Update `DATABASE_URL` in environment

#### Neon

1. Create database at [neon.tech](https://neon.tech)
2. Get connection string
3. Update `DATABASE_URL`

#### PlanetScale

1. Create database at [planetscale.com](https://planetscale.com)
2. Get connection string
3. Update `DATABASE_URL`

### Run Migrations

```bash
npm run db:push
```

## SSL/HTTPS Setup

### With Vercel/Railway/Render

SSL is automatic and included.

### With Docker/VPS

#### Using Certbot

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl status certbot.timer
```

#### Using Cloudflare

1. Add site to Cloudflare
2. Update DNS to Cloudflare nameservers
3. Enable "Full (strict)" SSL mode
4. Create Origin Certificate

## Performance Optimization

### CDN Setup

#### Cloudflare

1. Add site to Cloudflare
2. Configure caching rules:
   - Cache static assets: 1 month
   - Cache HTML: 1 hour
3. Enable optimizations:
   - Auto Minify
   - Brotli compression
   - HTTP/3

### Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

## Monitoring

### Setup Sentry

1. Create project at [sentry.io](https://sentry.io)
2. Add DSN to environment
3. Errors will auto-report

### Setup PostHog

1. Create project at [posthog.com](https://posthog.com)
2. Add API key to environment
3. Analytics will auto-track

## Backup Strategy

### Database Backups

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql

# Upload to S3
aws s3 cp backup_$DATE.sql s3://your-bucket/backups/
```

### Automated Backups

Add to crontab:

```bash
0 2 * * * /path/to/backup.sh
```

## Troubleshooting

### Build Fails

- Check Node.js version (needs 18+)
- Verify all environment variables
- Clear cache: `rm -rf .next node_modules`

### Database Connection Issues

- Verify DATABASE_URL format
- Check network/firewall rules
- Test connection: `npm run db:studio`

### Deployment Stuck

- Check build logs
- Verify memory limits (need 512MB+)
- Check disk space

## Support

- 📚 [Documentation](https://github.com/davimaciel1/claude-superplate)
- 💬 [Discussions](https://github.com/davimaciel1/claude-superplate/discussions)
- 🐛 [Issues](https://github.com/davimaciel1/claude-superplate/issues)
