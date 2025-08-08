# 🚀 Shadcn UI MCP Integration

Este projeto está configurado para usar o **Shadcn UI MCP Server** com Claude Code.

## ⚠️ IMPORTANTE: NÃO CRIE COMPONENTES MANUALMENTE!

Todos os componentes Shadcn UI devem ser instalados via MCP Server. **NUNCA** crie arquivos manualmente em `components/ui/`.

## 🔧 Setup Rápido

```bash
# 1. Clone o projeto
git clone https://github.com/davimaciel1/claude-superplate
cd claude-superplate

# 2. Instale as dependências
npm install

# 3. Configure o MCP automaticamente
npm run setup:mcp

# 4. Reinicie o Claude Desktop
```

## 📝 Como Usar no Claude

### Listar componentes disponíveis:
```
list_components {}
```

### Instalar um componente:
```
add_component {"name": "button"}
```

### Instalar múltiplos componentes:
```
add_components {"names": ["card", "dialog", "sheet"]}
```

## 📦 Componentes Disponíveis

- accordion
- alert
- alert-dialog
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- checkbox
- collapsible
- command
- context-menu
- dialog
- dropdown-menu
- form
- hover-card
- input
- label
- menubar
- navigation-menu
- pagination
- popover
- progress
- radio-group
- scroll-area
- select
- separator
- sheet
- skeleton
- slider
- switch
- table
- tabs
- textarea
- toast
- toggle
- toggle-group
- tooltip

## 📚 Documentação

- [Setup Completo](./docs/SHADCN_MCP_SETUP.md)
- [Claude.md](./CLAUDE.md)
- [Shadcn UI Docs](https://ui.shadcn.com)

## ❓ Troubleshooting

Se o MCP não funcionar:

1. Verifique se o caminho no config está correto
2. Reinicie o Claude Desktop completamente
3. Execute `npm run setup:mcp` novamente
4. Consulte [docs/SHADCN_MCP_SETUP.md](./docs/SHADCN_MCP_SETUP.md)

---

**Lembre-se:** Sempre use o MCP Server para instalar componentes!