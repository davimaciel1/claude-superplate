# 🚀 GUIA DE INÍCIO RÁPIDO - CLAUDE SUPERPLATE v2.1

## 📋 ARQUITETURA DO SISTEMA

```
DESENVOLVIMENTO         →         PRODUÇÃO (COOLIFY)
     ↓                                   ↓
  Supabase                         PostgreSQL
  (Cloud)                          (Docker)
  GRATUITO                         AUTOMATICO
```

---

## 🏃‍♂️ INÍCIO RÁPIDO EM 5 MINUTOS

### 1️⃣ **Clone e Instale**
```bash
git clone https://github.com/davimaciel1/claude-superplate meu-app
cd meu-app
npm install
```

### 2️⃣ **Configure o Supabase (Banco de Dados)**
1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Dê um nome e senha
4. Vá em **Settings → Database**
5. Copie a **Connection string**

### 3️⃣ **Configure o Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.development .env.local

# Abra o arquivo
code .env.local  # ou use seu editor preferido
```

Cole a connection string do Supabase:
```env
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"
```

### 4️⃣ **Configure MCP para Claude**
```bash
npm run setup:mcp
```

### 5️⃣ **Crie as Tabelas e Inicie**
```bash
# Criar tabelas no Supabase
npm run db:push

# Iniciar desenvolvimento
npm run dev
```

**🎉 PRONTO! Acesse http://localhost:3000**

---

## ⚙️ CONFIGURAÇÕES ADICIONAIS (OPCIONAIS)

### 🔐 **Clerk (Autenticação)**
1. Acesse [dashboard.clerk.com](https://dashboard.clerk.com)
2. Crie uma aplicação
3. Copie as chaves para `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### 💳 **Stripe (Pagamentos)**
1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. Copie as chaves de teste:
```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🐳 DEPLOY NO COOLIFY

### 1️⃣ **Prepare o Repositório**
```bash
git add .
git commit -m "feat: initial setup"
git push origin main
```

### 2️⃣ **Configure no Coolify**

1. **Adicione novo serviço** → Docker Compose
2. **Conecte o GitHub**
3. **Configure as variáveis de ambiente:**

```env
# PRODUÇÃO - Coolify Environment Variables
NODE_ENV=production
POSTGRES_PASSWORD=gere_senha_forte_aqui

# Database (Coolify cria automaticamente)
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/claude_superplate

# Clerk (use chaves de produção)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Stripe (use chaves de produção)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# App
NEXT_PUBLIC_APP_URL=https://seudominio.com
```

4. **Build Command:**
```bash
chmod +x scripts/setup-prod.sh && ./scripts/setup-prod.sh
```

5. **Deploy!** 🚀

---

## 📂 ESTRUTURA DO PROJETO

```
meu-app/
├── .env.local           # Suas configurações locais (Supabase)
├── .env.development     # Template para desenvolvimento
├── .env.production      # Template para produção
├── docker-compose.yml   # Config do Docker (Coolify usa isso)
├── Dockerfile          # Imagem otimizada para produção
├── app/                # Páginas e rotas
├── components/         # Componentes React
│   └── ui/            # Componentes Shadcn (via MCP!)
├── lib/               # Utilitários
└── scripts/           # Scripts de automação
```

---

## 💻 COMANDOS ÚTEIS

### Desenvolvimento
```bash
npm run dev              # Iniciar servidor
npm run db:push         # Criar/atualizar tabelas
npm run db:studio       # Interface visual do banco
npm run setup:mcp       # Configurar Claude MCP
```

### Produção
```bash
npm run build           # Build para produção
npm run start          # Iniciar em produção
npm run coolify:deploy # Script de deploy
```

### Docker (Local - Opcional)
```bash
npm run docker:prod    # Testar produção localmente
npm run docker:down    # Parar containers
```

---

## 🤖 USANDO COM CLAUDE CODE

### Adicionar Componentes Shadcn
```typescript
// No Claude, use:
add_component {"name": "button"}
add_components {"names": ["card", "dialog", "sheet"]}
```

### Listar Componentes
```typescript
list_components {}
```

---

## ❓ TROUBLESHOOTING

### "DATABASE_URL não está definida"
→ Configure o Supabase em `.env.local`

### "Cannot connect to database"
→ Verifique a connection string do Supabase

### "MCP não funciona"
→ Execute `npm run setup:mcp` e reinicie Claude Desktop

### "Build falhou no Coolify"
→ Verifique as variáveis de ambiente no Coolify

---

## 📚 DOCUMENTAÇÃO COMPLETA

- [DATABASE_SETUP.md](./docs/DATABASE_SETUP.md) - Config do banco
- [SHADCN_MCP_SETUP.md](./docs/SHADCN_MCP_SETUP.md) - Setup do MCP
- [CLAUDE.md](./CLAUDE.md) - Contexto para Claude Code

---

## 🎯 RESUMO

1. **Dev**: Supabase (gratuito, cloud)
2. **Prod**: PostgreSQL no Docker (Coolify)
3. **UI**: Shadcn via MCP (não manual!)
4. **Deploy**: Push → Coolify → Automático

**Tempo total de setup: ~5 minutos** ⚡

---

## 💬 SUPORTE

- Issues: [github.com/davimaciel1/claude-superplate/issues](https://github.com/davimaciel1/claude-superplate/issues)
- Discussions: [github.com/davimaciel1/claude-superplate/discussions](https://github.com/davimaciel1/claude-superplate/discussions)