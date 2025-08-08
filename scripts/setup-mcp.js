#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log('\n🚀 Configurando Shadcn UI MCP Server...\n');

// Detectar sistema operacional
const platform = os.platform();
let configPath;

if (platform === 'darwin') {
  // macOS
  configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
} else if (platform === 'win32') {
  // Windows
  configPath = path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');
} else {
  // Linux
  configPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
}

console.log(`📁 Arquivo de configuração detectado: ${configPath}`);

// Obter o caminho do projeto atual
const projectPath = process.cwd();
console.log(`📦 Caminho do projeto: ${projectPath}`);

// Configuração do MCP
const mcpConfig = {
  mcpServers: {
    shadcn: {
      command: 'npx',
      args: ['@shadcn/ui-mcp-server'],
      cwd: projectPath
    }
  }
};

// Verificar se o diretório existe
const configDir = path.dirname(configPath);
if (!fs.existsSync(configDir)) {
  console.log(`📂 Criando diretório de configuração...`);
  fs.mkdirSync(configDir, { recursive: true });
}

// Verificar se o arquivo de configuração já existe
if (fs.existsSync(configPath)) {
  console.log('⚠️  Arquivo de configuração já existe.');
  console.log('\n🔄 Atualizando configuração existente...');
  
  try {
    const existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Mesclar configurações
    if (!existingConfig.mcpServers) {
      existingConfig.mcpServers = {};
    }
    
    existingConfig.mcpServers.shadcn = mcpConfig.mcpServers.shadcn;
    
    // Salvar configuração atualizada
    fs.writeFileSync(configPath, JSON.stringify(existingConfig, null, 2));
    console.log('✅ Configuração atualizada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao atualizar configuração:', error.message);
    process.exit(1);
  }
} else {
  // Criar novo arquivo de configuração
  console.log('📝 Criando novo arquivo de configuração...');
  
  try {
    fs.writeFileSync(configPath, JSON.stringify(mcpConfig, null, 2));
    console.log('✅ Arquivo de configuração criado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar arquivo de configuração:', error.message);
    process.exit(1);
  }
}

// Instalar o MCP Server globalmente se não estiver instalado
console.log('\n📦 Verificando instalação do Shadcn UI MCP Server...');

try {
  execSync('npm list -g @shadcn/ui-mcp-server', { stdio: 'ignore' });
  console.log('✅ Shadcn UI MCP Server já está instalado!');
} catch {
  console.log('📦 Instalando Shadcn UI MCP Server globalmente...');
  try {
    execSync('npm install -g @shadcn/ui-mcp-server', { stdio: 'inherit' });
    console.log('✅ Shadcn UI MCP Server instalado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao instalar MCP Server:', error.message);
    console.log('\n💡 Tente instalar manualmente com: npm install -g @shadcn/ui-mcp-server');
  }
}

// Instruções finais
console.log('\n🎉 Configuração concluída!\n');
console.log('📖 Próximos passos:');
console.log('   1. Reinicie o Claude Desktop completamente');
console.log('   2. Abra este projeto no Claude');
console.log('   3. Teste com o comando: list_components {}');
console.log('\n📚 Para mais informações, consulte: docs/SHADCN_MCP_SETUP.md\n');

// Mostrar exemplo de uso
console.log('💡 Exemplos de comandos MCP no Claude:');
console.log('   - list_components {}');
console.log('   - add_component {"name": "button"}');
console.log('   - add_components {"names": ["card", "dialog", "sheet"]}');
console.log('   - check_dependencies {"component": "calendar"}');
console.log('\n');