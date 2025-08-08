-- ==========================================
-- 🗄️ SCRIPT DE INICIALIZAÇÃO DO BANCO
-- ==========================================
-- Este script roda automaticamente quando o PostgreSQL
-- é criado pela primeira vez no Docker

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Configurações de performance
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '7864kB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;

-- Criar schema se não existir
CREATE SCHEMA IF NOT EXISTS public;

-- Garantir permissões
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Log de inicialização
DO $$
BEGIN
  RAISE NOTICE 'Database initialized successfully at %', NOW();
END
$$;