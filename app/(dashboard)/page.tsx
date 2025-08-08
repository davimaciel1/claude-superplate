import { auth } from '@clerk/nextjs'

export default function DashboardPage() {
  const { userId } = auth()

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Bem-vindo!</h3>
          <p className="text-sm text-muted-foreground">
            Você está autenticado com Clerk.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Próximos Passos</h3>
          <p className="text-sm text-muted-foreground">
            Configure os componentes UI via MCP para desbloquear todas as funcionalidades.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Documentação</h3>
          <p className="text-sm text-muted-foreground">
            Consulte SETUP_INSTRUCTIONS.md para o guia completo.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-muted/50 p-6">
        <h2 className="text-xl font-semibold mb-4">Instalação de Componentes UI</h2>
        <p className="text-muted-foreground mb-4">
          Para habilitar todos os recursos do dashboard, execute no Claude:
        </p>
        <div className="bg-background p-4 rounded-md border">
          <code className="text-sm">
            add_components {JSON.stringify({names: ["button", "card", "dialog", "dropdown-menu", "form", "input", "label", "select", "tabs", "toast"]})}
          </code>
        </div>
      </div>
    </div>
  )
}