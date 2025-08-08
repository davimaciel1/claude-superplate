#!/bin/bash

# ==========================================
# 🚀 SETUP DESENVOLVIMENTO COM SUPABASE
# ==========================================

echo ""
echo "🚀 Claude Superplate - Setup de Desenvolvimento"
echo "================================================"
echo ""

# Verificar se Node está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale primeiro."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo "✅ npm $(npm -v) detectado"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install
echo ""

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
    echo "📝 Criando arquivo .env.local..."
    cp .env.development .env.local
    echo "✅ Arquivo .env.local criado!"
    echo ""
    echo "⚠️  IMPORTANTE: Configure suas credenciais no .env.local"
    echo ""
    echo "📋 Próximos passos:"
    echo "   1. Crie uma conta gratuita em https://supabase.com"
    echo "   2. Crie um novo projeto"
    echo "   3. Vá em Settings > Database"
    echo "   4. Copie a 'Connection string'"
    echo "   5. Cole no arquivo .env.local"
    echo ""
    echo "   Também configure:"
    echo "   - Clerk: https://dashboard.clerk.com"
    echo "   - Stripe: https://dashboard.stripe.com"
    echo ""
else
    echo "✅ Arquivo .env.local já existe"
fi

# Configurar MCP para Claude
echo ""
echo "🤖 Configurando MCP para Claude Code..."
npm run setup:mcp

# Verificar se o banco está configurado
echo ""
echo "🗄️ Verificando configuração do banco de dados..."
if grep -q "YOUR-PASSWORD" .env.local; then
    echo "⚠️  DATABASE_URL ainda não foi configurada!"
    echo "   Por favor, configure o Supabase primeiro."
else
    echo "✅ DATABASE_URL configurada"
    echo ""
    read -p "Deseja criar as tabelas no banco agora? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗄️ Criando tabelas..."
        npm run db:push
        echo "✅ Tabelas criadas com sucesso!"
    fi
fi

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📚 Comandos úteis:"
echo "   npm run dev        - Iniciar servidor de desenvolvimento"
echo "   npm run db:push    - Criar/atualizar tabelas"
echo "   npm run db:studio  - Abrir interface visual do banco"
echo ""
echo "💡 Dica: Execute 'npm run dev' para começar!"
echo ""