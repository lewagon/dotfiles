#!/bin/bash

# Rails + npm Development Script
# Usage: ./dev.sh [rails|npm|both|build|watch|stop|status]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RAILS_PORT=${RAILS_PORT:-3000}
NPM_WATCH_SCRIPT=${NPM_WATCH_SCRIPT:-"watch"}
NPM_BUILD_SCRIPT=${NPM_BUILD_SCRIPT:-"build"}
PID_DIR="/tmp/dev-scripts"
RAILS_PID_FILE="$PID_DIR/rails.pid"
NPM_PID_FILE="$PID_DIR/npm.pid"

# Create PID directory if it doesn't exist
mkdir -p "$PID_DIR"

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if process is running
is_process_running() {
    local pid_file=$1
    if [[ -f "$pid_file" ]]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        else
            rm -f "$pid_file"
            return 1
        fi
    fi
    return 1
}

# Kill process by PID file
kill_process() {
    local pid_file=$1
    local process_name=$2
    
    if is_process_running "$pid_file"; then
        local pid=$(cat "$pid_file")
        log_info "Stopping $process_name (PID: $pid)..."
        kill "$pid" 2>/dev/null || true
        rm -f "$pid_file"
        log_success "$process_name stopped"
    else
        log_warning "$process_name is not running"
    fi
}

# Start Rails server
start_rails() {
    if is_process_running "$RAILS_PID_FILE"; then
        log_warning "Rails server is already running"
        return 0
    fi
    
    log_info "Starting Rails server on port $RAILS_PORT..."
    
    # Check if Rails is available
    if ! command -v rails &> /dev/null; then
        log_error "Rails command not found. Make sure Rails is installed."
        exit 1
    fi
    
    # Start Rails server in background
    rails server -p "$RAILS_PORT" > /tmp/rails.log 2>&1 &
    local rails_pid=$!
    echo "$rails_pid" > "$RAILS_PID_FILE"
    
    # Wait a moment to check if it started successfully
    sleep 2
    if kill -0 "$rails_pid" 2>/dev/null; then
        log_success "Rails server started (PID: $rails_pid)"
        log_info "Rails server logs: tail -f /tmp/rails.log"
    else
        log_error "Failed to start Rails server"
        rm -f "$RAILS_PID_FILE"
        exit 1
    fi
}

# Start npm watch
start_npm_watch() {
    if is_process_running "$NPM_PID_FILE"; then
        log_warning "npm watch is already running"
        return 0
    fi
    
    log_info "Starting npm watch..."
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found. Make sure you're in the correct directory."
        exit 1
    fi
    
    # Check if npm is available
    if ! command -v npm &> /dev/null; then
        log_error "npm command not found. Make sure Node.js is installed."
        exit 1
    fi
    
    # Start npm watch in background
    npm run "$NPM_WATCH_SCRIPT" > /tmp/npm.log 2>&1 &
    local npm_pid=$!
    echo "$npm_pid" > "$NPM_PID_FILE"
    
    # Wait a moment to check if it started successfully
    sleep 2
    if kill -0 "$npm_pid" 2>/dev/null; then
        log_success "npm watch started (PID: $npm_pid)"
        log_info "npm watch logs: tail -f /tmp/npm.log"
    else
        log_error "Failed to start npm watch"
        rm -f "$NPM_PID_FILE"
        exit 1
    fi
}

# Run npm build
run_npm_build() {
    log_info "Running npm build..."
    
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found. Make sure you're in the correct directory."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm command not found. Make sure Node.js is installed."
        exit 1
    fi
    
    if npm run "$NPM_BUILD_SCRIPT"; then
        log_success "npm build completed successfully"
    else
        log_error "npm build failed"
        exit 1
    fi
}

# Show status
show_status() {
    echo -e "${BLUE}=== Development Environment Status ===${NC}"
    
    if is_process_running "$RAILS_PID_FILE"; then
        local rails_pid=$(cat "$RAILS_PID_FILE")
        echo -e "${GREEN}✓ Rails server is running (PID: $rails_pid)${NC}"
    else
        echo -e "${RED}✗ Rails server is not running${NC}"
    fi
    
    if is_process_running "$NPM_PID_FILE"; then
        local npm_pid=$(cat "$NPM_PID_FILE")
        echo -e "${GREEN}✓ npm watch is running (PID: $npm_pid)${NC}"
    else
        echo -e "${RED}✗ npm watch is not running${NC}"
    fi
    
    echo -e "${BLUE}==========================================${NC}"
}

# Cleanup function
cleanup() {
    log_info "Cleaning up processes..."
    kill_process "$RAILS_PID_FILE" "Rails server"
    kill_process "$NPM_PID_FILE" "npm watch"
}

# Trap to cleanup on script exit
trap cleanup EXIT

# Main script logic
case "${1:-help}" in
    "rails")
        start_rails
        ;;
    "npm")
        start_npm_watch
        ;;
    "both")
        start_rails
        start_npm_watch
        log_success "Both Rails server and npm watch are running"
        log_info "Press Ctrl+C to stop both processes"
        wait
        ;;
    "build")
        run_npm_build
        ;;
    "watch")
        start_npm_watch
        ;;
    "stop")
        cleanup
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        echo -e "${BLUE}Rails + npm Development Script${NC}"
        echo ""
        echo "Usage: $0 [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  rails    - Start Rails server only"
        echo "  npm      - Start npm watch only"
        echo "  both     - Start both Rails server and npm watch"
        echo "  build    - Run npm build"
        echo "  watch    - Start npm watch (alias for npm)"
        echo "  stop     - Stop all running processes"
        echo "  status   - Show status of running processes"
        echo "  help     - Show this help message"
        echo ""
        echo "Environment variables:"
        echo "  RAILS_PORT         - Rails server port (default: 3000)"
        echo "  NPM_WATCH_SCRIPT   - npm watch script name (default: watch)"
        echo "  NPM_BUILD_SCRIPT   - npm build script name (default: build)"
        echo ""
        echo "Examples:"
        echo "  $0 rails          # Start Rails server"
        echo "  $0 both           # Start both Rails and npm watch"
        echo "  RAILS_PORT=4000 $0 rails  # Start Rails on port 4000"
        ;;
esac 