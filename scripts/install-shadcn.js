#!/usr/bin/env node

const { ShadcnMCPClient } = require('../lib/shadcn-mcp')
const fs = require('fs')
const path = require('path')

async function installShadcnComponents() {
  console.log('🎨 Installing Shadcn UI Components...')
  
  const client = new ShadcnMCPClient()
  
  // Initialize Shadcn UI
  await client.init('default')
  
  // Essential components for the boilerplate
  const components = [
    'accordion',
    'alert',
    'alert-dialog',
    'avatar',
    'badge',
    'button',
    'calendar',
    'card',
    'checkbox',
    'collapsible',
    'command',
    'dialog',
    'dropdown-menu',
    'form',
    'input',
    'label',
    'menubar',
    'navigation-menu',
    'popover',
    'progress',
    'radio-group',
    'scroll-area',
    'select',
    'separator',
    'sheet',
    'skeleton',
    'slider',
    'switch',
    'table',
    'tabs',
    'textarea',
    'toast',
    'toggle',
    'tooltip',
  ]
  
  console.log(`📦 Installing ${components.length} components...`)
  
  for (const component of components) {
    try {
      await client.addComponent(component)
    } catch (error) {
      console.error(`Failed to install ${component}:`, error.message)
    }
  }
  
  console.log('✅ Shadcn UI components installed successfully!')
}

if (require.main === module) {
  installShadcnComponents().catch(console.error)
}

module.exports = { installShadcnComponents }