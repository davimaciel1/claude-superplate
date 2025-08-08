# Shadcn UI MCP Server Setup Guide

## ⚠️ IMPORTANTE

Este projeto usa o **Shadcn UI MCP Server** para gerenciar componentes. **NÃO crie componentes manualmente** na pasta `components/ui/`.

## 📦 O que é o Shadcn MCP?

O Shadcn MCP (Model Context Protocol) é um servidor que permite ao Claude Code instalar e gerenciar componentes Shadcn UI automaticamente no seu projeto.

## 🚀 Configuração Rápida

### 1. Instalar o MCP Server

```bash
# Instale globalmente
npm install -g @shadcn/ui-mcp-server

# Ou use direto com npx (recomendado)
npx @shadcn/ui-mcp-server
```

### 2. Configurar o Claude Desktop

Abra o arquivo de configuração do Claude Desktop:

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

### 3. Adicionar a Configuração do MCP

Copie e cole esta configuração no arquivo:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@shadcn/ui-mcp-server"],
      "cwd": "/caminho/para/seu/projeto/claude-superplate"
    }
  }
}
```

⚠️ **IMPORTANTE:** Substitua `/caminho/para/seu/projeto/claude-superplate` pelo caminho real do seu projeto!

### 4. Reiniciar o Claude Desktop

Após salvar o arquivo de configuração, reinicie completamente o Claude Desktop.

## 📝 Como Usar no Claude Code

### Listar Componentes Disponíveis

```typescript
// Claude, liste os componentes disponíveis
list_components {}
```

### Adicionar um Componente

```typescript
// Claude, adicione o componente button
add_component {"name": "button"}

// Claude, adicione o componente card
add_component {"name": "card"}
```

### Adicionar Múltiplos Componentes

```typescript
// Claude, adicione vários componentes de uma vez
add_components {"names": ["dialog", "sheet", "tabs", "accordion"]}
```

### Verificar Dependências

```typescript
// Claude, verifique as dependências do calendar
check_dependencies {"component": "calendar"}
```

### Adicionar Dependências

```typescript
// Claude, instale as dependências necessárias
add_dependencies {}
```

## 📋 Lista de Componentes Disponíveis

Aqui estão todos os componentes que você pode instalar via MCP:

### Layout
- `accordion` - Seções expansíveis
- `card` - Container de conteúdo
- `sheet` - Painel lateral deslizante
- `tabs` - Navegação por abas
- `separator` - Linha divisória

### Formulários
- `button` - Botões interativos
- `input` - Campo de entrada
- `textarea` - Área de texto
- `select` - Seletor dropdown
- `checkbox` - Caixa de seleção
- `radio-group` - Grupo de radio buttons
- `switch` - Interruptor on/off
- `slider` - Controle deslizante
- `toggle` - Botão toggle
- `form` - Formulário com validação

### Data Display
- `table` - Tabela de dados
- `badge` - Etiqueta/badge
- `progress` - Barra de progresso
- `avatar` - Avatar de usuário
- `calendar` - Calendário
- `aspect-ratio` - Manter proporção

### Feedback
- `alert` - Mensagem de alerta
- `alert-dialog` - Dialog de confirmação
- `toast` - Notificação temporária
- `skeleton` - Loading skeleton
- `spinner` - Loading spinner

### Navegação
- `dropdown-menu` - Menu dropdown
- `menubar` - Barra de menu
- `navigation-menu` - Menu de navegação
- `command` - Paleta de comandos
- `breadcrumb` - Breadcrumb navigation
- `pagination` - Paginação

### Overlay
- `dialog` - Modal/Dialog
- `popover` - Popover flutuante
- `tooltip` - Tooltip
- `hover-card` - Card ao passar mouse
- `context-menu` - Menu de contexto

### Utilitários
- `scroll-area` - Área com scroll customizado
- `collapsible` - Conteúdo colapsável
- `toggle-group` - Grupo de toggles

## 🎯 Exemplos Práticos

### Exemplo 1: Criar uma página de dashboard

```typescript
// 1. Primeiro, instale os componentes necessários via MCP
add_components {"names": ["card", "button", "tabs", "badge", "progress"]}

// 2. Depois, use os componentes no seu código
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Visão geral do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {/* Conteúdo */}
            </TabsContent>
            <TabsContent value="analytics">
              {/* Conteúdo */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Exemplo 2: Criar um formulário

```typescript
// 1. Instale os componentes
add_components {"names": ["form", "input", "button", "label", "checkbox"]}

// 2. Use no seu código
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm() {
  return (
    <form>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" />
      </div>
      <div>
        <Checkbox id="remember" />
        <Label htmlFor="remember">Lembrar de mim</Label>
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  )
}
```

## ❌ Erros Comuns e Soluções

### Erro: "MCP server not found"
**Solução:** Verifique se o caminho no `claude_desktop_config.json` está correto.

### Erro: "Component already exists"
**Solução:** O componente já foi instalado. Use-o diretamente importando de `@/components/ui/`.

### Erro: "Dependencies not installed"
**Solução:** Execute `add_dependencies {}` para instalar as dependências necessárias.

### Erro: "Cannot find module '@/components/ui/..."
**Solução:** O componente não foi instalado. Use `add_component {"name": "nome-do-componente"}`.

## 📚 Recursos Adicionais

- [Documentação Shadcn UI](https://ui.shadcn.com/docs)
- [Shadcn MCP Server GitHub](https://github.com/Jpisnice/shadcn-ui-mcp-server)
- [Claude MCP Documentation](https://docs.anthropic.com/mcp)

## 🔄 Workflow Recomendado

1. **Sempre verifique** se o componente existe antes de criar
2. **Use MCP** para instalar componentes Shadcn UI
3. **Crie componentes customizados** em outras pastas (não em `ui/`)
4. **Mantenha a pasta ui/** apenas para componentes instalados via MCP
5. **Documente** quais componentes foram instalados no projeto

## 📝 Checklist de Configuração

- [ ] MCP Server instalado (`npm install -g @shadcn/ui-mcp-server`)
- [ ] Arquivo de config do Claude Desktop localizado
- [ ] Configuração adicionada com o caminho correto do projeto
- [ ] Claude Desktop reiniciado
- [ ] Teste com `list_components {}` funcionando
- [ ] Primeiro componente instalado com sucesso

---

⚠️ **Lembre-se:** NUNCA crie arquivos manualmente em `components/ui/`. Sempre use o MCP Server!