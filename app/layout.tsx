import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Claude Superplate - Next.js SaaS Boilerplate',
  description: 'Production-ready Next.js boilerplate with auth, payments, and more',
  keywords: ['Next.js', 'React', 'TypeScript', 'SaaS', 'Boilerplate'],
  authors: [{ name: 'Claude Superplate' }],
  openGraph: {
    title: 'Claude Superplate',
    description: 'Production-ready Next.js boilerplate',
    url: 'https://claude-superplate.dev',
    siteName: 'Claude Superplate',
    images: [
      {
        url: 'https://claude-superplate.dev/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Superplate',
    description: 'Production-ready Next.js boilerplate',
    images: ['https://claude-superplate.dev/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}