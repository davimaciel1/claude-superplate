import { auth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const { userId } = auth()

  return (
    <div className="container py-8">
      <Card className="border-0 bg-transparent shadow-none mb-8">
        <CardHeader className="px-0">
          <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Você está autenticado com Clerk.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Configure os componentes UI via MCP para desbloquear todas as funcionalidades.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentação</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Consulte SETUP_INSTRUCTIONS.md para o guia completo.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Alert className="mt-8">
        <AlertTitle>Instalação de Componentes UI</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-4">
            Para habilitar todos os recursos do dashboard, execute no Claude:
          </p>
          <Card className="bg-background">
            <CardContent className="p-4">
              <code className="text-sm font-mono">
                add_components {JSON.stringify({names: ["button", "card", "dialog", "dropdown-menu", "form", "input", "label", "select", "tabs", "toast"]})}
              </code>
            </CardContent>
          </Card>
        </AlertDescription>
      </Alert>
    </div>
  )
}