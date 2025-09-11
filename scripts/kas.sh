#!/bin/bash
echo "🛑 Killing all development servers..."
echo ""

echo "Stopping Rails server (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
pkill -f "rails" 2>/dev/null
pkill -f "puma" 2>/dev/null
pkill -f "bundle exec rails" 2>/dev/null

echo "Stopping Vite server (port 3036)..."
lsof -ti:3036 | xargs kill -9 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "npm exec vite" 2>/dev/null

sleep 1

echo ""
echo "✅ All servers killed!"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers (this command)"