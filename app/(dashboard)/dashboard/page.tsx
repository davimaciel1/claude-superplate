'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { useToast } from '@/components/ui/use-toast'
import {
  BarChart3,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  MoreVertical,
  FileText,
  Mail,
  Bell,
  Settings
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [dateRange, setDateRange] = useState('30')
  const { toast } = useToast()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: 'Dashboard refreshed',
      description: 'All data has been updated.',
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsDownloading(false)
    toast({
      title: 'Report downloaded',
      description: 'Your dashboard report has been downloaded.',
    })
  }

  const recentActivity = [
    { 
      user: 'John Doe', 
      action: 'Purchased Pro Plan', 
      time: '2 minutes ago', 
      status: 'success',
      avatar: 'JD',
      amount: '$29.00'
    },
    { 
      user: 'Jane Smith', 
      action: 'Cancelled subscription', 
      time: '1 hour ago', 
      status: 'destructive',
      avatar: 'JS',
      amount: '-$49.00'
    },
    { 
      user: 'Bob Johnson', 
      action: 'Updated profile', 
      time: '3 hours ago', 
      status: 'default',
      avatar: 'BJ'
    },
    { 
      user: 'Alice Brown', 
      action: 'Invited team member', 
      time: '5 hours ago', 
      status: 'default',
      avatar: 'AB'
    },
    { 
      user: 'Charlie Wilson', 
      action: 'Upgraded to Enterprise', 
      time: '1 day ago', 
      status: 'success',
      avatar: 'CW',
      amount: '$199.00'
    },
  ]

  const quickActions = [
    { icon: Mail, label: 'Send Invoice', count: 3 },
    { icon: FileText, label: 'View Reports', count: 7 },
    { icon: Bell, label: 'Notifications', count: 12 },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex-1 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Downloading...</>
            ) : (
              <><Download className="mr-2 h-4 w-4" />Download</>  
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Print Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <StatsCards />

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card key={index} className="cursor-pointer transition-colors hover:bg-accent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {action.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {action.count && (
                      <div className="text-2xl font-bold">{action.count}</div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts and Activity */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="col-span-full lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Your revenue performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card className="col-span-full md:col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions in your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.amount && (
                        <span className={`text-sm font-medium ${
                          activity.status === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.amount}
                        </span>
                      )}
                      <Badge variant={activity.status as any} className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <Badge variant="outline" className="font-mono">3.2%</Badge>
                  </div>
                  <div className="overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-2 bg-primary transition-all duration-500 ease-out" 
                      style={{ width: '32%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">↑ 12%</span> from last period
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avg. Order Value</span>
                    <Badge variant="outline" className="font-mono">$127.50</Badge>
                  </div>
                  <div className="overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-2 bg-primary transition-all duration-500 ease-out" 
                      style={{ width: '67%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">↑ 8%</span> from last period
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Retention</span>
                    <Badge variant="outline" className="font-mono">89%</Badge>
                  </div>
                  <div className="overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-2 bg-primary transition-all duration-500 ease-out" 
                      style={{ width: '89%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">↓ 2%</span> from last period
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Page Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.2M</div>
                      <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Bounce Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">32.5%</div>
                      <p className="text-xs text-muted-foreground">-5% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <OverviewChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download detailed reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Monthly Sales Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Customer Analytics Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Revenue Forecast Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}