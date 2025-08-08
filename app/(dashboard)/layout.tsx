import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import DashboardNav from '@/components/dashboard/nav'
import DashboardHeader from '@/components/dashboard/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  )
}