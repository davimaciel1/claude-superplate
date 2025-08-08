"use client"

// This component will work after installing required UI components via MCP
// Run in Claude: add_components {"names": ["card"]}

export function Overview() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Install UI components via MCP to enable this dashboard.
      </p>
    </div>
  )
}