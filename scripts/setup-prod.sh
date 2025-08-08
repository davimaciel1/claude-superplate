#!/bin/bash

# ==========================================
# 🚀 SETUP PRODUÇÃO NO COOLIFY
# ==========================================
# Este script roda automaticamente no deploy

echo "🚀 Iniciando deploy em produção..."
echo "==================================="
echo ""

# Verificar variáveis de ambiente
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL não está configurada!"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" ]; then
    echo "⚠️  Clerk não está configurado. Auth pode não funcionar."
fi

if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "⚠️  Stripe não está configurado. Pagamentos podem não funcionar."
fi

# Instalar dependências de produção
echo "📦 Instalando dependências..."
npm ci --only=production

# Aguardar banco de dados estar pronto
echo "🗄️ Aguardando banco de dados..."
max_retries=30
retry_count=0

while [ $retry_count -lt $max_retries ]; do
    if npm run db:health-check 2>/dev/null; then
        echo "✅ Banco de dados está pronto!"
        break
    fi
    echo "   Tentativa $((retry_count + 1))/$max_retries..."
    sleep 2
    retry_count=$((retry_count + 1))
done

if [ $retry_count -eq $max_retries ]; then
    echo "❌ Banco de dados não está respondendo!"
    exit 1
fi

# Aplicar migrations
echo ""
echo "🗄️ Aplicando migrations..."
npm run db:push

# Build da aplicação
echo ""
echo "🔨 Fazendo build da aplicação..."
npm run build

# Verificar se o build foi bem sucedido
if [ ! -d ".next" ]; then
    echo "❌ Build falhou!"
    exit 1
fi

echo ""
echo "✅ Deploy concluído com sucesso!"
echo "==================================="
echo ""
echo "📊 Status:"
echo "   - Banco de dados: Conectado"
echo "   - Migrations: Aplicadas"
echo "   - Build: Completo"
echo "   - Aplicação: Pronta para iniciar"
echo ""