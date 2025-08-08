# 🗄️ Configuração do Banco de Dados

Este projeto suporta várias opções de banco de dados para desenvolvimento e produção.

## 🚀 Opções de Desenvolvimento (Sem Docker Desktop)

### Opção 1: PostgreSQL Local

#### Windows
```bash
# Download e instalação
# https://www.postgresql.org/download/windows/

# Após instalar, crie o banco
psql -U postgres
CREATE DATABASE claude_superplate_dev;
\q
```

#### macOS
```bash
# Instale via Homebrew
brew install postgresql@15
brew services start postgresql@15

# Crie o banco
createdb claude_superplate_dev
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Crie o banco
sudo -u postgres createdb claude_superplate_dev
```

#### Configure o .env.local
```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/claude_superplate_dev"
USE_PGLITE="false"
```

### Opção 2: Supabase (Cloud - Gratuito)

1. Acesse [supabase.com](https://supabase.com)
2. Crie um projeto gratuito
3. Vá em Settings > Database
4. Copie a Connection String

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
USE_PGLITE="false"
```

### Opção 3: Neon (Cloud - Gratuito)

1. Acesse [neon.tech](https://neon.tech)
2. Crie um projeto
3. Copie a connection string

```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require"
USE_PGLITE="false"
```

### Opção 4: Railway (Cloud - $5/mês)

1. Acesse [railway.app](https://railway.app)
2. Crie um novo projeto
3. Adicione PostgreSQL
4. Copie a DATABASE_URL

```env
DATABASE_URL="postgresql://postgres:[password]@[host]:[port]/railway"
USE_PGLITE="false"
```

### Opção 5: PGlite (Arquivo Local - Experimental)

**Atenção:** PGlite é experimental e não recomendado para produção.

```bash
# Instale o PGlite
npm install @electric-sql/pglite

# Configure o .env.local
USE_PGLITE="true"
DATABASE_URL="postgresql://localhost/claude_superplate_dev"
```

## 🐳 Produção com Coolify

No Coolify, o Docker Compose criará o PostgreSQL automaticamente.

### docker-compose.yml (já configurado)
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/claude_superplate
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: claude_superplate
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📝 Comandos de Banco de Dados

```bash
# Aplicar migrations
npm run db:push

# Gerar migrations
npm run db:generate

# Abrir Drizzle Studio (interface visual)
npm run db:studio

# Resetar banco (desenvolvimento)
npm run db:reset
```

## 🔧 Troubleshooting

### Erro: "DATABASE_URL não está definida"
- Verifique se o arquivo `.env.local` existe
- Verifique se a DATABASE_URL está configurada

### Erro: "Connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique a porta (padrão: 5432)
- Verifique usuário e senha

### Erro: "Database does not exist"
- Crie o banco de dados primeiro
- Ou deixe o Drizzle criar: `npm run db:push`

## 🎯 Recomendações

### Para Desenvolvimento Local:
1. **Supabase** - Mais fácil, gratuito, cloud
2. **PostgreSQL Local** - Controle total, offline
3. **Neon** - Rápido, serverless, gratuito

### Para Produção:
1. **Coolify + Docker** - Deploy automático
2. **Supabase** - Managed, escalável
3. **Neon** - Serverless, auto-scaling

## 📚 Links Úteis

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Coolify Docs](https://coolify.io/docs)