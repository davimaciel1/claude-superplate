"use client"

import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center flex-1 gap-4">
        <MobileSidebar />
        <div className="relative w-full max-w-md">
          <label htmlFor="search" className="sr-only">Search</label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="search"
            placeholder="Search..."
            className="pl-10"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center" variant="destructive">
            3
          </Badge>
          <span className="sr-only">3 new notifications</span>
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}