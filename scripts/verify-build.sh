#!/bin/bash

# Build Verification Script
echo "🧪 Verifying build configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node version
echo -e "\n🔍 Checking Node.js version..."
node_version=$(node -v)
echo "Node version: $node_version"

# Check if .env.local exists
echo -e "\n🔍 Checking environment configuration..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local found${NC}"
else
    echo -e "${YELLOW}⚠️  .env.local not found - using defaults for build${NC}"
fi

# Check dependencies
echo -e "\n🔍 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules found${NC}"
else
    echo -e "${RED}❌ node_modules not found - run 'npm install'${NC}"
    exit 1
fi

# Type check
echo -e "\n🔍 Running TypeScript check..."
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ TypeScript check passed${NC}"
else
    echo -e "${RED}❌ TypeScript errors found${NC}"
    npm run type-check
    exit 1
fi

# Lint check
echo -e "\n🔍 Running ESLint..."
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ESLint check passed${NC}"
else
    echo -e "${YELLOW}⚠️  ESLint warnings found${NC}"
fi

# Build test
echo -e "\n🏗️ Running build test..."
if npm run build; then
    echo -e "\n${GREEN}🎉 BUILD SUCCESSFUL!${NC}"
    echo -e "The project builds without errors."
    echo -e "\nNext steps:"
    echo -e "1. Configure environment variables in .env.local"
    echo -e "2. Install UI components via MCP in Claude"
    echo -e "3. Run 'npm run dev' to start development"
else
    echo -e "\n${RED}❌ BUILD FAILED${NC}"
    echo -e "Please check the errors above."
    exit 1
fi