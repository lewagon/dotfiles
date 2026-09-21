#!/bin/bash
echo "⚡ Starting Vite server..."
echo ""

# Kill any existing Vite server first
echo "Stopping any existing Vite server..."
pkill -f "bin/vite dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1

echo "Starting Vite server in background..."
(bin/vite dev > /tmp/vite.log 2>&1 &)
VITE_PID=$!

sleep 3

echo ""
echo "✅ Vite server started!"
echo "Vite:  http://localhost:3036 (PID: $VITE_PID)"
echo ""
echo "📋 To view Vite logs:"
echo "  tail -f /tmp/vite.log"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers"
🌐 Access URL: