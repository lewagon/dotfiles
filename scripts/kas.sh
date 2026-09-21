#!/bin/bash
echo "🛑 Killing all development servers..."
echo ""

echo "Stopping Rails server (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
pkill -f "rails" 2>/dev/null
pkill -f "puma" 2>/dev/null
pkill -f "bundle exec rails" 2>/dev/null

echo "Stopping Vite server (ports 3036, 3106)..."
lsof -ti:3036 | xargs kill -9 2>/dev/null
lsof -ti:3106 | xargs kill -9 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "npm exec vite" 2>/dev/null
pkill -f "bundle exec vite" 2>/dev/null

echo "Stopping Redis server (port 6379)..."
lsof -ti:6379 | xargs kill -9 2>/dev/null
pkill -f "redis-server" 2>/dev/null

echo "Stopping GoodJob workers..."
pkill -f "good_job" 2>/dev/null
pkill -f "bundle exec good_job" 2>/dev/null

echo "Stopping Python executors..."
echo "  - Python executor (ports 8101, 8001)..."
# Python executor (ports 8101 and 8001 - default)
lsof -ti:8101 | xargs kill -9 2>/dev/null
lsof -ti:8001 | xargs kill -9 2>/dev/null
pkill -f "python_executor" 2>/dev/null
pkill -f "python_executor/dev_start" 2>/dev/null
pkill -f "uvicorn.*8101" 2>/dev/null
pkill -f "uvicorn.*8001" 2>/dev/null

echo "  - Python open executor (ports 8012, 8002)..."
# Python open executor (ports 8012 and 8002)
lsof -ti:8012 | xargs kill -9 2>/dev/null
lsof -ti:8002 | xargs kill -9 2>/dev/null
pkill -f "python_open_executor" 2>/dev/null
pkill -f "python_open_executor/dev_start" 2>/dev/null
pkill -f "uvicorn.*8012" 2>/dev/null
pkill -f "uvicorn.*8002" 2>/dev/null

echo "  - Python langchain executor (port 8110)..."
# Python langchain executor (port 8110)
lsof -ti:8110 | xargs kill -9 2>/dev/null
pkill -f "python_langchain_executor" 2>/dev/null
pkill -f "python_langchain_executor/dev_start" 2>/dev/null
pkill -f "run_uvicorn.sh" 2>/dev/null
pkill -f "uvicorn.*8110" 2>/dev/null

echo "  - API / uvicorn (port 8000)..."
lsof -ti:8000 | xargs kill -9 2>/dev/null
pkill -f "uvicorn.*8000" 2>/dev/null

# Catch any remaining uvicorn processes running app.main:app
pkill -f "uvicorn app.main:app" 2>/dev/null

echo "Stopping Foreman/Overmind processes..."
pkill -f "foreman" 2>/dev/null
pkill -f "overmind" 2>/dev/null
pkill -f "bin/dev" 2>/dev/null

echo "Removing stale PID files..."
rm -f /Users/ces/code/deepdocs_code/aifactory/tmp/pids/server.pid 2>/dev/null
echo "  ✓ Removed Rails server PID file"

echo "Killing any remaining processes on development ports (3000, 3036, 3106, 6379, 8000, 8001, 8002, 8101, 8012, 8110)..."
# Kill any remaining processes on all development ports
REMAINING=$(lsof -ti:3000,3036,3106,6379,8000,8001,8002,8101,8012,8110 2>/dev/null | wc -l | tr -d ' ')
if [ "$REMAINING" -gt 0 ]; then
  lsof -ti:3000,3036,3106,6379,8000,8001,8002,8101,8012,8110 2>/dev/null | xargs kill -9 2>/dev/null || true
  echo "  ✓ Killed $REMAINING remaining process(es)"
else
  echo "  ✓ No remaining processes found"
fi

sleep 1

echo ""
echo "✅ All servers killed!"
echo ""
echo "📋 Summary:"
echo "  • Rails server (port 3000)"
echo "  • Vite server (ports 3036, 3106)"
echo "  • Redis server (port 6379)"
echo "  • GoodJob workers"
echo "  • Python executors & API (ports 8000, 8001, 8002, 8101, 8012, 8110)"
echo "  • Foreman/Overmind processes"
echo "  • Stale PID files removed"
echo "  • All remaining processes on development ports cleaned"
echo ""
echo "🔧 Management commands:"
echo "  rds  # Start both Rails and Vite servers"
echo "  crs  # Check server status"
echo "  krs  # Kill Rails server only"
echo "  kvs  # Kill Vite server only"
echo "  rvs  # Start just Vite server"
echo "  kas  # Kill all servers (Rails, Vite, GoodJob, Python executors, Redis)"
