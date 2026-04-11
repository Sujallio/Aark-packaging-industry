#!/bin/bash

# AARK ERP Supabase - Setup Script for Mac/Linux
# This script automates the setup process

echo "🚀 AARK ERP Supabase - Automated Setup"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Create .env.local
echo "📝 Setting up environment variables..."
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Skipping..."
else
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "📌 IMPORTANT: Edit .env.local with your Supabase credentials"
    echo "   VITE_SUPABASE_URL=your_supabase_url"
    echo "   VITE_SUPABASE_ANON_KEY=your_anon_key"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .gitignore entries
echo "🔐 Securing credentials..."
if grep -q ".env.local" .gitignore; then
    echo "✅ .env.local is in .gitignore"
else
    echo ".env.local" >> .gitignore
    echo "✅ Added .env.local to .gitignore"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "📚 For detailed instructions, see: SETUP_GUIDE.md"
echo "🆘 For troubleshooting, see: TROUBLESHOOTING.md"
echo ""
