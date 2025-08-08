import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Claude Superplate',
  description: 'The most complete Next.js boilerplate',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
  authors: [{ name: 'Claude Superplate' }],
  creator: 'Claude Superplate',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://claude-superplate.dev',
    title: 'Claude Superplate',
    description: 'The most complete Next.js boilerplate',
    siteName: 'Claude Superplate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Superplate',
    description: 'The most complete Next.js boilerplate',
    creator: '@claudesuperplate',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}