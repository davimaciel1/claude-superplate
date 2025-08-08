export default function TeamPage() {
  const teamMembers = [
    { id: 1, name: 'João Silva', email: 'joao@empresa.com', role: 'Admin' },
    { id: 2, name: 'Maria Santos', email: 'maria@empresa.com', role: 'Membro' },
  ]

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Equipe</h1>
          <p className="text-muted-foreground">
            Gerencie os membros da sua equipe
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Membros da Equipe</h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-md bg-muted">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Para funcionalidade completa, instale os componentes via MCP:
          </p>
          <div className="bg-background p-3 rounded-md mt-2">
            <p className="font-mono text-xs">
              add_components {JSON.stringify({names: ["avatar", "badge", "dropdown-menu", "button"]})}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}