#!/bin/bash
echo "🛑 Killing Vite server on port 3036..."
echo ""

lsof -ti:3036 | xargs kill -9 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "npm exec vite" 2>/dev/null

echo "✅ Vite server killed!"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only (this command)"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers"
