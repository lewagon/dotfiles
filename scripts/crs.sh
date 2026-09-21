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
# Check Redis server
REDIS_RUNNING=false
if lsof -i :6379 >/dev/null 2>&1; then
    PID=$(lsof -ti :6379 | head -1)
    echo "✅ Redis server (port 6379): Running. PID $PID."
    REDIS_RUNNING=true
else
    echo "❌ Redis server (port 6379): Not running"
fi

echo ""
# Check Sidekiq workers
SIDEKIQ_RUNNING=false
SIDEKIQ_PID=$(ps aux | grep "[s]idekiq" | awk '{print $2}' | head -1)
if [ ! -z "$SIDEKIQ_PID" ]; then
    echo "✅ Sidekiq workers: Running. Example PID $SIDEKIQ_PID."
    SIDEKIQ_RUNNING=true
else
    echo "❌ Sidekiq workers: Not running"
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
# Docker status
if command -v docker >/dev/null 2>&1; then
    if docker info >/dev/null 2>&1; then
        echo "🐳 Docker daemon: Running"
        RUNNING_CONTAINERS=$(docker ps --format '{{.Names}}' | wc -l | tr -d ' ')
        if [ "$RUNNING_CONTAINERS" -gt 0 ]; then
            echo "  Containers running: $RUNNING_CONTAINERS"
            DOCKER_REDIS=$(docker ps --filter "name=redis" --format '{{.Names}}' | paste -sd, -)
            if [ ! -z "$DOCKER_REDIS" ]; then
                echo "  🔴 redis containers: $DOCKER_REDIS"
            fi
            DOCKER_SIDEKIQ=$(docker ps --filter "name=sidekiq" --format '{{.Names}}' | paste -sd, -)
            if [ ! -z "$DOCKER_SIDEKIQ" ]; then
                echo "  🧰 sidekiq containers: $DOCKER_SIDEKIQ"
            fi
        else
            echo "  No containers running."
        fi
    else
        echo "🐳 Docker daemon: Not running"
    fi
else
    echo "🐳 Docker: Not installed"
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

echo ""
echo "📋 To view server logs:"
echo "  tail -f /tmp/rails.log        # Rails server (trs)"
echo "  tail -f /tmp/vite.log         # Vite server (tvs)"
echo "  tail -f log/sidekiq.log       # Sidekiq (Rails app) (tsk)"
echo "  docker logs -f <sidekiq_name> # Sidekiq (Docker) (tdok <sidekiq_name>)"
if [ -f /opt/homebrew/var/log/redis.log ]; then
    echo "  tail -f /opt/homebrew/var/log/redis.log  # Redis (Homebrew) (trds)"
elif [ -f /usr/local/var/log/redis.log ]; then
    echo "  tail -f /usr/local/var/log/redis.log     # Redis (Homebrew) (trds)"
else
    echo "  redis-cli monitor              # Redis live command stream (fallback)"
fi
echo "  docker logs -f <redis_name>    # Redis (Docker) (trdsdok <redis_name>)"
