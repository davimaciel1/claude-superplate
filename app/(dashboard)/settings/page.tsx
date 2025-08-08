import { auth } from '@clerk/nextjs'

export default async function SettingsPage() {
  const { userId } = auth()
  
  if (!userId) {
    return <div>Please sign in to view settings</div>
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Instruções de Setup</h2>
        <p className="text-muted-foreground mb-4">
          Para habilitar todas as funcionalidades desta página, você precisa instalar os componentes UI via MCP no Claude.
        </p>
        <div className="bg-muted p-4 rounded-md">
          <p className="font-mono text-sm">
            add_components {JSON.stringify({names: ["card", "tabs", "button", "input", "label", "switch", "avatar", "badge"]})}
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Após instalar os componentes, as configurações completas estarão disponíveis.
        </p>
      </div>
    </div>
  )
}