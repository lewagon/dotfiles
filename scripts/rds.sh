#!/bin/bash
echo "🚀 Starting Rails and Vite servers..."
echo ""

# Kill any existing servers first
echo "Stopping any existing servers..."
pkill -f "bin/rails s" 2>/dev/null || true
pkill -f "bin/vite dev" 2>/dev/null || true
sleep 1

echo "Starting Rails server in background..."
(bin/rails s > /tmp/rails.log 2>&1 &)
RAILS_PID=$!

echo "Starting Vite server in background..."
(bin/vite dev > /tmp/vite.log 2>&1 &)
VITE_PID=$!

sleep 3

echo ""
echo "✅ Both servers started!"
echo "Rails: http://localhost:3000 (PID: $RAILS_PID)"
echo "Vite:  http://localhost:3036 (PID: $VITE_PID)"
echo ""
echo "📋 To view server logs:"
echo "  tail -f /tmp/rails.log  # Rails server"
echo "  tail -f /tmp/vite.log   # Vite server"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers"
echo ""
echo "🌐 Access URLs:"
echo "  Rails: http://localhost:3000"
echo "  Vite:  http://localhost:3036"
