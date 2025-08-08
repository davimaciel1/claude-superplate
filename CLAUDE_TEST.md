# 🧪 Teste de Validação - Claude Superplate v2.0

## Para o Claude validar seu entendimento:

### 1. Como você instalaria componentes Shadcn UI?
**Resposta esperada:** Usar MCP commands como `add_component {"name": "button"}`, NUNCA criar manualmente em components/ui/

### 2. Qual banco de dados usar em desenvolvimento?
**Resposta esperada:** Supabase (cloud, gratuito)

### 3. Qual banco de dados usar em produção?
**Resposta esperada:** PostgreSQL em Docker container (via Coolify)

### 4. Como fazer deploy?
**Resposta esperada:** Push para GitHub → Coolify detecta → Docker Compose executa → Deploy automático

### 5. Onde ficam os componentes customizados?
**Resposta esperada:** Em `components/` (mas NÃO em `components/ui/` que é exclusivo para MCP)

### 6. Como adicionar uma nova página protegida?
**Resposta esperada:** Criar em `app/(dashboard)/nome-da-pagina/page.tsx`

### 7. Quais são as tools MCP disponíveis?
**Resposta esperada:**
- list_components {}
- add_component {"name": "..."}
- add_components {"names": [...]}
- check_dependencies {"component": "..."}
- add_dependencies {}

### 8. Como criar uma API route?
**Resposta esperada:** Em `app/api/[resource]/route.ts` com validação Zod e auth via Clerk

## ✅ Se o Claude responder corretamente, o sistema está 100% configurado!