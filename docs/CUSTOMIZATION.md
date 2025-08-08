# 🎨 Customization Guide

## Theme Customization

### Color Scheme

Edit `app/globals.css` to change the color palette:

```css
@layer base {
  :root {
    --primary: 262.1 83.3% 57.8%; /* Purple */
    --primary-foreground: 210 40% 98%;
    
    /* Change to your brand colors */
    --primary: 220 90% 50%; /* Blue */
    --primary: 150 80% 40%; /* Green */
    --primary: 350 85% 55%; /* Pink */
  }
}
```

### Typography

Customize fonts in `app/layout.tsx`:

```typescript
import { Inter, Poppins, Roboto } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
})
```

Update `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['var(--font-sans)', ...fontFamily.sans],
  heading: ['var(--font-heading)', ...fontFamily.sans],
}
```

## Component Customization

### Adding Shadcn Components

```bash
# Add a single component
npx shadcn-ui@latest add button

# Add multiple components
npx shadcn-ui@latest add dialog card badge

# Add all components
npx shadcn-ui@latest add --all
```

### Customizing Existing Components

Edit components in `components/ui/`:

```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        // Add custom variant
        brand: "bg-brand text-white hover:bg-brand/90",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      },
      size: {
        // Add custom size
        xl: "h-14 px-8 text-lg",
      },
    },
  }
)
```

## Page Templates

### Creating New Pages

```typescript
// app/custom-page/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Page',
  description: 'Your custom page description',
}

export default function CustomPage() {
  return (
    <div>
      <h1>Custom Page</h1>
    </div>
  )
}
```

### Layout Customization

```typescript
// app/(custom)/layout.tsx
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="custom-layout">
      <nav>Custom Navigation</nav>
      <main>{children}</main>
      <footer>Custom Footer</footer>
    </div>
  )
}
```

## Navigation Customization

### Dashboard Navigation

Edit `components/dashboard/nav.tsx`:

```typescript
const navigation = [
  {
    title: 'Custom Page',
    href: '/dashboard/custom',
    icon: CustomIcon,
  },
  // Add more items
]
```

### Main Navigation

Create `components/navigation/main-nav.tsx`:

```typescript
const items = [
  { title: 'Features', href: '/features' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]
```

## Database Schema

### Adding New Tables

Create `lib/db/schema/custom.ts`:

```typescript
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const customTable = pgTable('custom_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

Run migration:

```bash
npm run db:generate
npm run db:push
```

## API Routes

### Creating Custom API Routes

```typescript
// app/api/custom/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function GET(request: NextRequest) {
  const { userId } = auth()
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Your logic here
  return NextResponse.json({ data: 'success' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Handle POST request
}
```

## Email Templates

### Creating Custom Email Templates

```typescript
// emails/custom-email.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface CustomEmailProps {
  name: string
  message: string
}

export default function CustomEmail({ name, message }: CustomEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Custom email preview text</Preview>
      <Body>
        <Container>
          <Heading>Hello {name}</Heading>
          <Text>{message}</Text>
          <Link href="https://example.com">Call to Action</Link>
        </Container>
      </Body>
    </Html>
  )
}
```

## Internationalization

### Adding Languages

```typescript
// messages/pt.json
{
  "home": {
    "title": "Bem-vindo",
    "description": "Descrição em português"
  }
}

// messages/es.json
{
  "home": {
    "title": "Bienvenido",
    "description": "Descripción en español"
  }
}
```

Update `next.config.js`:

```javascript
i18n: {
  locales: ['en', 'pt', 'es', 'fr', 'de'],
  defaultLocale: 'en',
}
```

## Analytics & Tracking

### Custom Events

```typescript
// lib/analytics.ts
import posthog from 'posthog-js'

export function trackEvent(event: string, properties?: any) {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

// Usage
trackEvent('button_clicked', {
  button_name: 'cta_hero',
  page: 'home',
})
```

## SEO Optimization

### Meta Tags

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Your Title',
    description: 'Your description',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Title',
    description: 'Your description',
    images: ['/twitter-image.jpg'],
  },
}
```

### Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

## Performance Optimization

### Lazy Loading

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
)
```

### Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Support

- 📚 [Documentation](https://github.com/davimaciel1/claude-superplate)
- 💬 [Discussions](https://github.com/davimaciel1/claude-superplate/discussions)
- 🐛 [Issues](https://github.com/davimaciel1/claude-superplate/issues)
