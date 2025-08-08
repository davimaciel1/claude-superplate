#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function printHeader() {
  console.clear()
  print('\n╔══════════════════════════════════════════════════════╗', 'cyan')
  print('║                                                      ║', 'cyan')
  print('║         🚀 CLAUDE SUPERPLATE SETUP WIZARD 🚀        ║', 'cyan')
  print('║                                                      ║', 'cyan')
  print('╚══════════════════════════════════════════════════════╝', 'cyan')
  print('')
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function selectOption(prompt, options) {
  print(`\n${prompt}`, 'bright')
  options.forEach((opt, idx) => {
    print(`  ${idx + 1}. ${opt.name} ${opt.description ? `- ${opt.description}` : ''}`, 'dim')
  })
  
  const answer = await question(`\nSelect (1-${options.length}): `)
  const index = parseInt(answer) - 1
  
  if (index >= 0 && index < options.length) {
    return options[index]
  }
  
  print('Invalid selection. Please try again.', 'red')
  return selectOption(prompt, options)
}

async function multiSelect(prompt, options) {
  print(`\n${prompt}`, 'bright')
  print('(Enter numbers separated by commas, e.g., 1,3,5)', 'dim')
  
  options.forEach((opt, idx) => {
    print(`  ${idx + 1}. ${opt.name} ${opt.description ? `- ${opt.description}` : ''}`, 'dim')
  })
  
  const answer = await question('\nSelect features: ')
  const indices = answer.split(',').map(n => parseInt(n.trim()) - 1)
  
  return options.filter((_, idx) => indices.includes(idx))
}

async function setupProject() {
  printHeader()
  
  // Project Type
  const projectType = await selectOption('What type of project are you building?', [
    { value: 'saas', name: '🚀 SaaS Platform', description: 'Multi-tenant with dashboard & billing' },
    { value: 'ecommerce', name: '🛍️ E-commerce', description: 'Online store with cart & checkout' },
    { value: 'blog', name: '📝 Blog/CMS', description: 'Content management with SEO' },
    { value: 'landing', name: '🎯 Landing Page', description: 'Marketing site with forms' },
    { value: 'custom', name: '⚡ Custom', description: 'Start with base template' },
  ])
  
  // Style
  const style = await selectOption('Choose your design style:', [
    { value: 'modern', name: '🎨 Modern', description: 'Gradients, animations, glassmorphism' },
    { value: 'minimal', name: '⚪ Minimal', description: 'Clean, simple, typography-focused' },
    { value: 'enterprise', name: '💼 Enterprise', description: 'Professional and corporate' },
  ])
  
  // Features
  const features = await multiSelect('Select features to include:', [
    { value: 'auth', name: '🔐 Authentication', description: 'Clerk with social login' },
    { value: 'database', name: '💾 Database', description: 'PostgreSQL with Drizzle ORM' },
    { value: 'payments', name: '💳 Payments', description: 'Stripe subscriptions' },
    { value: 'email', name: '📧 Email', description: 'Resend transactional emails' },
    { value: 'analytics', name: '📊 Analytics', description: 'PostHog analytics' },
    { value: 'monitoring', name: '🚨 Monitoring', description: 'Sentry error tracking' },
    { value: 'i18n', name: '🌍 Internationalization', description: 'Multi-language support' },
    { value: 'docker', name: '🐳 Docker', description: 'Docker compose setup' },
  ])
  
  // Project name
  const projectName = await question('\nProject name (my-app): ')
  const name = projectName || 'my-app'
  
  // Confirmation
  print('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'dim')
  print('📋 Configuration Summary:', 'bright')
  print(`  Project: ${name}`, 'cyan')
  print(`  Type: ${projectType.name}`, 'cyan')
  print(`  Style: ${style.name}`, 'cyan')
  print(`  Features: ${features.map(f => f.name).join(', ')}`, 'cyan')
  print('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'dim')
  
  const confirm = await question('\nProceed with setup? (Y/n): ')
  
  if (confirm.toLowerCase() === 'n') {
    print('Setup cancelled.', 'yellow')
    process.exit(0)
  }
  
  // Apply configuration
  print('\n🚀 Setting up your project...', 'green')
  
  const config = {
    name,
    type: projectType.value,
    style: style.value,
    features: features.map(f => f.value),
  }
  
  // Save configuration
  fs.writeFileSync(
    path.join(process.cwd(), '.superplate.json'),
    JSON.stringify(config, null, 2)
  )
  
  // Apply template
  print('\n📦 Applying template...', 'yellow')
  applyTemplate(config)
  
  // Install dependencies
  print('\n📦 Installing dependencies...', 'yellow')
  execSync('npm install', { stdio: 'inherit' })
  
  // Setup complete
  print('\n✅ Setup complete!', 'green')
  print('\n🎯 Next steps:', 'bright')
  print('  1. Copy .env.example to .env.local', 'dim')
  print('  2. Add your API keys', 'dim')
  print('  3. Run: npm run dev', 'dim')
  print('\n🚀 Happy coding!', 'cyan')
  
  rl.close()
}

function applyTemplate(config) {
  // This would apply the selected template
  // For now, just log the config
  console.log('Applying configuration:', config)
}

// Handle CLI arguments
if (process.argv.includes('--ci')) {
  // CI mode - use defaults or env vars
  const config = {
    name: process.env.PROJECT_NAME || 'my-app',
    type: process.env.PROJECT_TYPE || 'saas',
    style: process.env.PROJECT_STYLE || 'modern',
    features: (process.env.PROJECT_FEATURES || 'auth,database,payments').split(','),
  }
  
  fs.writeFileSync(
    path.join(process.cwd(), '.superplate.json'),
    JSON.stringify(config, null, 2)
  )
  
  applyTemplate(config)
  process.exit(0)
} else {
  // Interactive mode
  setupProject().catch(console.error)
}