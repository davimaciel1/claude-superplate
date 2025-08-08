import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function NotFound() {
  return (
    <Card className="min-h-screen flex items-center justify-center border-0 rounded-none">
      <CardContent className="max-w-md mx-auto text-center">
        <Badge variant="secondary" className="text-6xl px-6 py-4 mb-4">
          404
        </Badge>
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Page not found</CardTitle>
          <CardDescription>
            The page you are looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <Button asChild className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </CardContent>
    </Card>
  )
}