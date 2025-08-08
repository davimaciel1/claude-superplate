'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="min-h-screen flex items-center justify-center border-0 rounded-none">
      <CardContent className="max-w-md mx-auto text-center">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Something went wrong!
          </AlertDescription>
        </Alert>
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Error Occurred</CardTitle>
          <CardDescription>
            An error occurred while processing your request.
          </CardDescription>
        </CardHeader>
        <Button onClick={() => reset()} className="mt-4">
          Try again
        </Button>
      </CardContent>
    </Card>
  )
}