import { auth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

export default async function SettingsPage() {
  const { userId } = auth()
  
  if (!userId) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Please sign in to view settings
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-6xl py-8">
      <Card className="border-0 bg-transparent shadow-none mb-8">
        <CardHeader className="px-0">
          <CardTitle className="text-3xl font-bold">Configurações</CardTitle>
          <CardDescription>
            Gerencie suas preferências e configurações da conta
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Instruções de Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            Para habilitar todas as funcionalidades desta página, você precisa instalar os componentes UI via MCP no Claude.
          </CardDescription>
          <Alert>
            <AlertDescription>
              <code className="font-mono text-sm">
                add_components {JSON.stringify({names: ["card", "tabs", "button", "input", "label", "switch", "avatar", "badge"]})}
              </code>
            </AlertDescription>
          </Alert>
          <CardDescription className="mt-4">
            Após instalar os componentes, as configurações completas estarão disponíveis.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}