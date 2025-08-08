'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="mt-2 text-muted-foreground">
        An error occurred while processing your request.
      </p>
      <Button onClick={() => reset()} className="mt-8">
        Try again
      </Button>
    </div>
  )
}