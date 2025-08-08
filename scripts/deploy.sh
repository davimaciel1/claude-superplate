#!/bin/bash

# Script de deploy para Coolify
# Este script é executado automaticamente no deploy

echo "🚀 Iniciando deploy..."

# Instala dependências
echo "📦 Instalando dependências..."
npm ci --only=production

# Aplica migrations no banco de produção
echo "🗄️ Aplicando migrations..."
npm run db:push

# Build da aplicação
echo "🔨 Building aplicação..."
npm run build

echo "✅ Deploy concluído!"