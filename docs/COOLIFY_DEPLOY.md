# 🚀 Deploy no Coolify - Guia Completo

## 🎯 Visão Geral

Este guia mostra como fazer deploy do Claude Superplate no Coolify usando Docker Compose.

**Arquitetura:**
- **Desenvolvimento**: Supabase (banco remoto gratuito)
- **Produção**: Coolify + PostgreSQL em Docker

## 📝 Pré-requisitos

1. Servidor com Coolify instalado
2. Domínio configurado (opcional)
3. Conta no GitHub com o projeto
4. Contas nos serviços:
   - Clerk (autenticação)
   - Stripe (pagamentos) - opcional
   - Resend (emails) - opcional

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Configure o GitHub

```bash
# Faça fork ou clone do projeto
git clone https://github.com/davimaciel1/claude-superplate
cd claude-superplate

# Crie seu próprio repositório
git remote set-url origin https://github.com/SEU_USUARIO/SEU_REPO
git push -u origin main
```

### 1.2 Verifique os Arquivos Necessários

Certifique-se de que estes arquivos existem:
- ✅ `docker-compose.yml`
- ✅ `Dockerfile`
- ✅ `scripts/deploy.sh`

## 🌐 Passo 2: Configurar no Coolify

### 2.1 Criar Novo Projeto

1. Acesse seu painel Coolify
2. Clique em **"New Project"**
3. Escolha **"Docker Compose"**

### 2.2 Conectar o GitHub

1. Em **Source**, escolha **GitHub**
2. Autorize o Coolify se necessário
3. Selecione seu repositório
4. Branch: `main`

### 2.3 Configurar Build

```yaml
# Build Configuration
Build Pack: Docker Compose
Base Directory: /
Docker Compose File: docker-compose.yml
```

## 🔐 Passo 3: Variáveis de Ambiente

No Coolify, vá em **Environment Variables** e adicione:

### Variáveis Obrigatórias

```env
# ========== BANCO DE DADOS ==========
# Senha forte para o PostgreSQL (gere uma senha segura!)
POSTGRES_PASSWORD=gere_uma_senha_muito_forte_aqui_32_chars

# ========== NODE ==========
NODE_ENV=production

# ========== CLERK AUTH (Obrigatório) ==========
# Pegue em: https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# ========== APP URL ==========
# Seu domínio ou IP do servidor
NEXT_PUBLIC_APP_URL=https://seudominio.com
# ou
# NEXT_PUBLIC_APP_URL=http://IP_DO_SERVIDOR:3000
```

### Variáveis Opcionais (Recomendadas)

```env
# ========== STRIPE (Pagamentos) ==========
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# ========== RESEND (Emails) ==========
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@seudominio.com

# ========== SENTRY (Monitoramento) ==========
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# ========== POSTHOG (Analytics) ==========
NEXT_PUBLIC_POSTHOG_KEY=phc_...
```

## 🚀 Passo 4: Deploy

### 4.1 Configurar Comando de Build

Em **Build Command**, adicione:

```bash
chmod +x scripts/deploy.sh && ./scripts/deploy.sh
```

### 4.2 Configurar Health Check

Em **Health Check**:

```yaml
Path: /api/health
Interval: 30
Timeout: 10
Retries: 3
```

### 4.3 Iniciar Deploy

1. Clique em **"Deploy"**
2. Acompanhe os logs
3. Aguarde cerca de 3-5 minutos

## ✅ Passo 5: Verificar Deploy

### 5.1 Checar Status

- ✅ Container `app` rodando
- ✅ Container `db` rodando
- ✅ Health check passando

### 5.2 Testar Aplicação

1. Acesse `https://seudominio.com`
2. Teste o login/cadastro
3. Verifique o dashboard

## 🔄 Passo 6: Configuração de Domínio (Opcional)

### 6.1 No Coolify

1. Vá em **Domains**
2. Adicione seu domínio
3. Ative **SSL/HTTPS**

### 6.2 No seu DNS

Adicione um registro A:

```
Tipo: A
Nome: @ (ou subdomínio)
Valor: IP_DO_SEU_SERVIDOR
TTL: 3600
```

## 🛠️ Manutenção

### Atualizar Aplicação

```bash
# No seu computador
git add .
git commit -m "feat: nova feature"
git push

# Coolify detecta e faz deploy automático
```

### Acessar Logs

No Coolify:
1. Vá em **Logs**
2. Selecione o container (`app` ou `db`)
3. Visualize logs em tempo real

### Backup do Banco

```bash
# Conecte via SSH no servidor
ssh user@seu-servidor

# Entre no container
docker exec -it [CONTAINER_ID] bash

# Faça backup
pg_dump -U postgres claude_superplate > backup.sql
```

## 🐛 Troubleshooting

### Erro: "Database connection failed"

**Solução:**
1. Verifique se `POSTGRES_PASSWORD` está definida
2. Verifique se o container `db` está rodando
3. Aguarde 30 segundos para o banco inicializar

### Erro: "Build failed"

**Solução:**
1. Verifique os logs de build
2. Certifique-se que `Dockerfile` existe
3. Verifique se todas as variáveis estão definidas

### Erro: "Clerk authentication error"

**Solução:**
1. Verifique as keys do Clerk
2. Use keys de produção (`pk_live_`, `sk_live_`)
3. Configure o domínio no dashboard do Clerk

### Erro: "Port already in use"

**Solução:**
1. Mude a porta em `PORT` env variable
2. Ou pare outros containers usando porta 3000

## 📊 Monitoramento

### Métricas do Container

No Coolify, vá em **Metrics** para ver:
- CPU usage
- Memory usage
- Network I/O
- Disk usage

### Alerts

Configure alerts em **Settings > Notifications**:
- Deploy success/failure
- Container down
- High resource usage

## 🔒 Segurança

### Checklist de Segurança

- ✅ Use senhas fortes para `POSTGRES_PASSWORD`
- ✅ Ative HTTPS/SSL
- ✅ Configure firewall do servidor
- ✅ Mantenha Coolify atualizado
- ✅ Faça backups regulares
- ✅ Use secrets para variáveis sensíveis

### Firewall Recomendado

```bash
# Apenas portas necessárias
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw enable
```

## 🎉 Próximos Passos

1. **Configure um domínio customizado**
2. **Ative SSL/HTTPS**
3. **Configure backups automáticos**
4. **Adicione monitoramento (Sentry)**
5. **Configure CI/CD com GitHub Actions**

## 📚 Recursos Adicionais

- [Documentação Coolify](https://coolify.io/docs)
- [Clerk Produção](https://clerk.com/docs/deployments/overview)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [PostgreSQL Tuning](https://pgtune.leopard.in.ua/)

## 🔑 Comandos Úteis

```bash
# Ver logs do app
docker logs -f [CONTAINER_ID]

# Entrar no container do app
docker exec -it [CONTAINER_ID] sh

# Reiniciar containers
docker-compose restart

# Ver status
docker-compose ps

# Limpar volumes (CUIDADO: apaga dados!)
docker-compose down -v
```

---

**Dúvidas?** Abra uma issue no GitHub ou consulte a documentação do Coolify.