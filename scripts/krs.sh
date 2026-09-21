#!/bin/bash
echo "🛑 Killing Rails server on port 3000..."
echo ""

lsof -ti:3000 | xargs kill -9 2>/dev/null
pkill -f "rails" 2>/dev/null
pkill -f "puma" 2>/dev/null
pkill -f "bundle exec rails" 2>/dev/null

echo "✅ Rails server killed!"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only (this command)"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers"
