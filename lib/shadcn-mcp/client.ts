/**
 * Shadcn UI MCP Client
 * Integrates with the Shadcn UI MCP Server to fetch components and blocks
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export interface Component {
  name: string
  description: string
  dependencies: string[]
  files: string[]
  type: 'component' | 'block'
}

export interface ComponentDemo {
  name: string
  code: string
  imports: string[]
  description: string
}

export interface Block {
  name: string
  description: string
  code: string
  style: 'default' | 'new-york'
  components: string[]
}

export class ShadcnMCPClient {
  private githubToken?: string
  private componentsCache: Map<string, Component> = new Map()
  private blocksCache: Map<string, Block> = new Map()

  constructor(githubToken?: string) {
    this.githubToken = githubToken || process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  }

  /**
   * Initialize Shadcn UI in the project
   */
  async init(style: 'default' | 'new-york' = 'default') {
    console.log('🎨 Initializing Shadcn UI...')
    
    try {
      execSync(`npx shadcn-ui@latest init -y --style ${style}`, {
        stdio: 'inherit'
      })
      console.log('✅ Shadcn UI initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize Shadcn UI:', error)
      throw error
    }
  }

  /**
   * Add a component from Shadcn UI
   */
  async addComponent(componentName: string) {
    console.log(`📦 Adding component: ${componentName}`)
    
    try {
      execSync(`npx shadcn-ui@latest add ${componentName} -y`, {
        stdio: 'inherit'
      })
      console.log(`✅ Component ${componentName} added successfully`)
    } catch (error) {
      console.error(`❌ Failed to add component ${componentName}:`, error)
      throw error
    }
  }

  /**
   * Add multiple components
   */
  async addComponents(components: string[]) {
    for (const component of components) {
      await this.addComponent(component)
    }
  }

  /**
   * Get all available components
   */
  async listComponents(): Promise<string[]> {
    // List of all Shadcn UI components
    return [
      'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
      'badge', 'button', 'calendar', 'card', 'carousel', 'checkbox',
      'collapsible', 'command', 'context-menu', 'dialog', 'drawer',
      'dropdown-menu', 'form', 'hover-card', 'input', 'label',
      'menubar', 'navigation-menu', 'pagination', 'popover', 'progress',
      'radio-group', 'scroll-area', 'select', 'separator', 'sheet',
      'skeleton', 'slider', 'switch', 'table', 'tabs', 'textarea',
      'toast', 'toggle', 'toggle-group', 'tooltip', 'sonner',
      'breadcrumb', 'resizable', 'combobox', 'data-table', 'date-picker',
      'input-otp', 'chart'
    ]
  }

  /**
   * Get block templates (dashboard, authentication, etc.)
   */
  async getBlocks(): Promise<Block[]> {
    return [
      {
        name: 'dashboard-01',
        description: 'Dashboard with sidebar navigation',
        style: 'default',
        components: ['card', 'button', 'dropdown-menu', 'avatar', 'badge'],
        code: await this.getDashboardTemplate()
      },
      {
        name: 'authentication-01',
        description: 'Login page with form',
        style: 'default',
        components: ['button', 'card', 'form', 'input', 'label'],
        code: await this.getAuthTemplate('login')
      },
      {
        name: 'authentication-02',
        description: 'Register page with form',
        style: 'default',
        components: ['button', 'card', 'form', 'input', 'label'],
        code: await this.getAuthTemplate('register')
      },
      {
        name: 'pricing-01',
        description: 'Pricing cards with features',
        style: 'default',
        components: ['card', 'button', 'badge'],
        code: await this.getPricingTemplate()
      }
    ]
  }

  /**
   * Apply a block template to the project
   */
  async applyBlock(blockName: string, targetPath: string) {
    const blocks = await this.getBlocks()
    const block = blocks.find(b => b.name === blockName)
    
    if (!block) {
      throw new Error(`Block ${blockName} not found`)
    }

    // Install required components
    console.log(`📦 Installing components for ${blockName}...`)
    await this.addComponents(block.components)

    // Write the block code
    const dir = path.dirname(targetPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(targetPath, block.code)
    console.log(`✅ Block ${blockName} applied to ${targetPath}`)
  }

  /**
   * Generate dashboard template
   */
  private async getDashboardTemplate(): Promise<string> {
    return `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BarChart3, Users, DollarSign, Activity, Menu } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Revenue
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              Activity
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+180 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your team's latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">User {i} completed a task</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}`
  }

  /**
   * Generate authentication template
   */
  private async getAuthTemplate(type: 'login' | 'register'): Promise<string> {
    const isLogin = type === 'login'
    return `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ${isLogin ? 'Login' : 'Register'}() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>${isLogin ? 'Welcome back' : 'Create an account'}</CardTitle>
          <CardDescription>
            ${isLogin ? 'Enter your credentials to access your account' : 'Enter your information to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            ${!isLogin ? `<div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>` : ''}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            ${!isLogin ? `<div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>` : ''}
            <Button type="submit" className="w-full">
              ${isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            ${isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Link href="${isLogin ? '/sign-up' : '/sign-in'}" className="ml-1 text-primary hover:underline">
              ${isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}`
  }

  /**
   * Generate pricing template
   */
  private async getPricingTemplate(): Promise<string> {
    return `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for individuals',
    features: [
      '1 user',
      '10 projects',
      '2GB storage',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Great for small teams',
    features: [
      '5 users',
      'Unlimited projects',
      '10GB storage',
      'Priority support',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'Unlimited projects',
      'Unlimited storage',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
]

export default function Pricing() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-lg text-muted-foreground">
          Choose the perfect plan for your needs
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
            {plan.popular && (
              <div className="px-3 py-1 text-center">
                <Badge className="rounded-b-none">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}`
  }
}

export default ShadcnMCPClient