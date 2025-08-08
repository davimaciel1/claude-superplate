# 🎨 UI Components Setup

## ⚠️ IMPORTANT: Components Must Be Installed via MCP

This project uses Shadcn UI components that must be installed through the MCP (Model Context Protocol) server when using Claude.

## Installation Process

### 1. Setup MCP (One Time)
```bash
npm run setup:mcp
```
Restart Claude Desktop after running this command.

### 2. Install Components in Claude

When working with Claude, use these commands to install components:

#### Install All Components (Recommended)
```
add_components {"names": [
  "accordion", "alert", "alert-dialog", "aspect-ratio", "avatar",
  "badge", "breadcrumb", "button", "calendar", "card",
  "checkbox", "collapsible", "command", "context-menu", "dialog",
  "dropdown-menu", "form", "hover-card", "input", "label",
  "menubar", "navigation-menu", "pagination", "popover", "progress",
  "radio-group", "scroll-area", "select", "separator", "sheet",
  "skeleton", "slider", "switch", "table", "tabs",
  "textarea", "toast", "toggle", "toggle-group", "tooltip"
]}
```

#### Or Install Individually As Needed
```
add_component {"name": "button"}
add_component {"name": "card"}
add_component {"name": "dialog"}
// etc...
```

### 3. Check Installed Components
```
list_components {}
```

## Component Dependencies

Some components have dependencies. Check before installing:
```
check_dependencies {"component": "calendar"}
```

If dependencies are missing:
```
add_dependencies {}
```

## Manual Installation (Without Claude)

If you're not using Claude, you can install components manually:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc...
```

## Required Components for Features

### Settings Pages
- card
- button
- input
- label
- switch
- badge
- avatar
- tabs

### Team Page
- card
- avatar
- badge
- button
- dropdown-menu
- input

### Analytics Page
- card
- tabs
- badge

### Notifications
- popover
- scroll-area
- badge
- button
- tabs

## Troubleshooting

### "Cannot find module '@/components/ui/...'"
The component is not installed. Use MCP to install it:
```
add_component {"name": "component-name"}
```

### "MCP server not found"
1. Run `npm run setup:mcp`
2. Restart Claude Desktop
3. Try again

### Components not working
1. Check if all dependencies are installed
2. Verify imports are correct
3. Make sure you're using the latest version

## Best Practices

1. **Never** manually create files in `components/ui/`
2. **Always** use MCP when working with Claude
3. **Install** all components at once for complete functionality
4. **Check** dependencies before installing complex components
5. **Update** components regularly for bug fixes

## Component Documentation

For detailed component documentation, visit:
[https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)