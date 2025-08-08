'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, CreditCard, Download, Plus, Zap } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with actual data from your backend
  const subscription = {
    plan: 'Pro',
    status: 'active',
    price: 29,
    interval: 'month',
    currentPeriodEnd: new Date('2024-02-01'),
    cancelAtPeriodEnd: false,
  }

  const usage = {
    projects: { used: 7, limit: -1 },
    teamMembers: { used: 4, limit: 10 },
    storage: { used: 2.3, limit: 10 }, // in GB
    apiCalls: { used: 45000, limit: 100000 },
  }

  const invoices = [
    { id: 1, date: '2024-01-01', amount: 29, status: 'paid' },
    { id: 2, date: '2023-12-01', amount: 29, status: 'paid' },
    { id: 3, date: '2023-11-01', amount: 29, status: 'paid' },
  ]

  const handleManageSubscription = async () => {
    setIsLoading(true)
    // Redirect to Stripe Customer Portal
    // const { url } = await createPortalSession()
    // window.location.href = url
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{subscription.plan} Plan</h3>
                    <Badge variant="secondary">
                      {subscription.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    ${subscription.price}/{subscription.interval}
                  </p>
                </div>
                <Button onClick={handleManageSubscription} disabled={isLoading}>
                  Manage Subscription
                </Button>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Current period ends</span>
                  <span className="font-medium">
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
                {subscription.cancelAtPeriodEnd && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Subscription ending</AlertTitle>
                    <AlertDescription>
                      Your subscription will end on{' '}
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive" variant="outline">
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upgrade to Enterprise</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Get unlimited everything and dedicated support
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Add Payment Method</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Add a backup payment method
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Method
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Download Invoices</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Get all your invoices in one place
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
              <CardDescription>
                Track your usage across different resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Projects</span>
                  <span className="font-medium">
                    {usage.projects.used} / {usage.projects.limit === -1 ? 'Unlimited' : usage.projects.limit}
                  </span>
                </div>
                <Progress value={usage.projects.limit === -1 ? 0 : (usage.projects.used / usage.projects.limit) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Team Members</span>
                  <span className="font-medium">
                    {usage.teamMembers.used} / {usage.teamMembers.limit}
                  </span>
                </div>
                <Progress value={(usage.teamMembers.used / usage.teamMembers.limit) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Storage</span>
                  <span className="font-medium">
                    {usage.storage.used} GB / {usage.storage.limit} GB
                  </span>
                </div>
                <Progress value={(usage.storage.used / usage.storage.limit) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>API Calls</span>
                  <span className="font-medium">
                    {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                  </span>
                </div>
                <Progress value={(usage.apiCalls.used / usage.apiCalls.limit) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                Download your past invoices and receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">
                        Invoice #{invoice.id.toString().padStart(5, '0')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={invoice.status === 'paid' ? 'secondary' : 'destructive'}>
                        {invoice.status}
                      </Badge>
                      <span className="font-medium">${invoice.amount}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-muted p-2">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/24</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Default</Badge>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}