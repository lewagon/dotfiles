#!/bin/bash
echo "=== SERVER STATUS CHECK ==="
echo ""

# Check Rails server
RAILS_RUNNING=false
if lsof -i :3000 >/dev/null 2>&1; then
    PID=$(lsof -ti :3000 | head -1)
    echo "✅ Rails server (port 3000): Running locally on IPv4 & IPv6 (localhost only). PID $PID."
    RAILS_RUNNING=true
else
    echo "❌ Rails server (port 3000): Not running"
fi

echo ""

# Check Vite server
VITE_RUNNING=false
if lsof -i :3036 >/dev/null 2>&1; then
    PID=$(lsof -ti :3036 | head -1)
    echo "✅ Vite dev server (port 3036): Running and listening on all interfaces (*). PID $PID."
    VITE_RUNNING=true
else
    echo "❌ Vite dev server (port 3036): Not running"
fi

echo ""
echo "Related processes:"

# Check for npm exec vite
NPM_PID=$(ps aux | grep "npm exec vite" | grep -v grep | awk '{print $2}' | head -1)
if [ ! -z "$NPM_PID" ]; then
    echo "  📦 npm exec vite helper, PID $NPM_PID."
fi

# Check for ruby_lsp_rails
RUBY_PID=$(ps aux | grep "ruby_lsp_rails" | grep -v grep | awk '{print $2}' | head -1)
if [ ! -z "$RUBY_PID" ]; then
    echo "  🔧 ruby_lsp_rails language server, PID $RUBY_PID."
fi

echo ""
echo "🌐 Access URLs:"
if [ "$RAILS_RUNNING" = true ]; then
    echo "  Rails: http://localhost:3000"
fi
if [ "$VITE_RUNNING" = true ]; then
    echo "  Vite:  http://localhost:3036"
fi

echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status (this command)"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers"
