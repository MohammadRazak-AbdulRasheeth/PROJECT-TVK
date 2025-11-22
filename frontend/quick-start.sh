#!/bin/bash
# Quick Start Script for TVK Canada Frontend

echo "🎬 TVK Canada Frontend - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo "✓ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
    echo ""
    echo "🚀 Starting development server..."
    echo "   Open http://localhost:3000 in your browser"
    echo ""
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
