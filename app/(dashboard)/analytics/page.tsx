export default function AnalyticsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Acompanhe as métricas e o desempenho do seu negócio
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Métrica {i}</div>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Instale componentes UI para ver dados</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Setup Necessário</h2>
        <p className="text-muted-foreground mb-4">
          Para visualizar os gráficos e métricas, instale os componentes via MCP:
        </p>
        <div className="bg-muted p-4 rounded-md">
          <p className="font-mono text-sm">
            add_components {JSON.stringify({names: ["card", "tabs", "badge", "progress"]})}
          </p>
        </div>
      </div>
    </div>
  )
}