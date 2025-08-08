'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  RefreshCw
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      description: 'from last month'
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180',
      trend: 'up',
      icon: Users,
      description: 'new this week'
    },
    {
      title: 'Total Sales',
      value: '12,234',
      change: '+19%',
      trend: 'up',
      icon: BarChart3,
      description: 'from last month'
    },
    {
      title: 'Active Now',
      value: '573',
      change: '-4.3%',
      trend: 'down',
      icon: Activity,
      description: 'than usual'
    }
  ]

  const recentActivity = [
    { user: 'John Doe', action: 'Purchased Pro Plan', time: '2 minutes ago', status: 'success' },
    { user: 'Jane Smith', action: 'Cancelled subscription', time: '1 hour ago', status: 'destructive' },
    { user: 'Bob Johnson', action: 'Updated profile', time: '3 hours ago', status: 'default' },
    { user: 'Alice Brown', action: 'Invited team member', time: '5 hours ago', status: 'default' },
    { user: 'Charlie Wilson', action: 'Upgraded to Enterprise', time: '1 day ago', status: 'success' },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center text-xs">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                        {stat.change}
                      </span>
                      <span className="ml-1 text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts and Activity */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Your revenue performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  [Revenue Chart Placeholder]
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions in your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={activity.status as any}>
                          {activity.time}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <Badge variant="outline">3.2%</Badge>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[32%] rounded-full bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avg. Order Value</span>
                    <Badge variant="outline">$127.50</Badge>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[67%] rounded-full bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Retention</span>
                    <Badge variant="outline">89%</Badge>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[89%] rounded-full bg-primary" />
                  </div>
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
                Detailed analytics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Analytics Dashboard Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Reports Section Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Notifications Settings Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}