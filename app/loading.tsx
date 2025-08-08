import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Card className="min-h-screen flex items-center justify-center border-0 rounded-none">
      <div className="space-y-3">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
    </Card>
  )
}