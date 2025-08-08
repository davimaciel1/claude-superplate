'use client'

import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Search, Settings, Plus } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export default function DashboardHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      {/* Search */}
      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full max-w-sm pl-8 md:w-[300px]" 
            />
          </div>
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Create New */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Project</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Invoice</DropdownMenuItem>
            <DropdownMenuItem>Document</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-2 p-2">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">New team member joined</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" asChild>
          <a href="/dashboard/settings">
            <Settings className="h-5 w-5" />
          </a>
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Menu */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}