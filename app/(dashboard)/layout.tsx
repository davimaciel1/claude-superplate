import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <nav className="flex items-center space-x-6">
            <a href="/" className="font-semibold">Claude Superplate</a>
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</a>
            <a href="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</a>
            <a href="/team" className="text-sm text-muted-foreground hover:text-foreground">Team</a>
            <a href="/settings" className="text-sm text-muted-foreground hover:text-foreground">Settings</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}