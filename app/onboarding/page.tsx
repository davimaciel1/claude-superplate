'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Building2, Users, User, ArrowRight, CheckCircle2 } from 'lucide-react'

const steps = [
  { id: 'account-type', title: 'Account Type', description: 'How will you use Claude Superplate?' },
  { id: 'organization', title: 'Organization', description: 'Tell us about your organization' },
  { id: 'complete', title: 'Complete', description: 'You\'re all set!' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [accountType, setAccountType] = useState('personal')
  const [organizationName, setOrganizationName] = useState('')
  const [organizationSize, setOrganizationSize] = useState('1-10')

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    // Save onboarding data to database
    // await saveOnboardingData({ accountType, organizationName, organizationSize })
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to Claude Superplate</h1>
          <p className="mt-2 text-muted-foreground">Let's get your account set up</p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 0 && (
              <RadioGroup value={accountType} onValueChange={setAccountType}>
                <div className="grid gap-4">
                  <label
                    htmlFor="personal"
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                  >
                    <RadioGroupItem value="personal" id="personal" />
                    <User className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium">Personal</p>
                      <p className="text-sm text-muted-foreground">For individual developers and freelancers</p>
                    </div>
                  </label>
                  <label
                    htmlFor="team"
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                  >
                    <RadioGroupItem value="team" id="team" />
                    <Users className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium">Team</p>
                      <p className="text-sm text-muted-foreground">For small teams and startups</p>
                    </div>
                  </label>
                  <label
                    htmlFor="enterprise"
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                  >
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Building2 className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium">Enterprise</p>
                      <p className="text-sm text-muted-foreground">For large organizations</p>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            )}

            {currentStep === 1 && accountType !== 'personal' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    placeholder="Acme Inc."
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-size">Organization Size</Label>
                  <RadioGroup value={organizationSize} onValueChange={setOrganizationSize}>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
                        <RadioGroupItem value="1-10" />
                        <span>1-10 employees</span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
                        <RadioGroupItem value="11-50" />
                        <span>11-50 employees</span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
                        <RadioGroupItem value="51-200" />
                        <span>51-200 employees</span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
                        <RadioGroupItem value="200+" />
                        <span>200+ employees</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 1 && accountType === 'personal' && (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-4 text-lg font-medium">Great choice!</p>
                <p className="mt-2 text-muted-foreground">
                  Your personal account is ready. Let's get started!
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-xl font-bold">You're all set!</h3>
                <p className="mt-2 text-muted-foreground">
                  Your account has been configured successfully.
                </p>
                <div className="mt-6 rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">Account Type: {accountType}</p>
                  {accountType !== 'personal' && (
                    <>
                      <p className="text-sm">Organization: {organizationName}</p>
                      <p className="text-sm">Size: {organizationSize} employees</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="ml-auto">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} className="ml-auto">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}