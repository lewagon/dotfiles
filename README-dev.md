# Rails + npm Development Setup

This setup provides a comprehensive development environment for Rails apps with React/Redux frontend using Webpacker.

## Files Created

- `dev.sh` - Main development script with process management
- Updated `aliases` - Shell aliases for quick access

## Installation

1. **Make the script executable** (already done):
   ```bash
   chmod +x dev.sh
   ```

2. **Reload your shell configuration**:
   ```bash
   source ~/.zshrc
   # or if you source aliases separately:
   source ~/path/to/aliases
   ```

3. **Configure your package.json** (if not already done):
   ```json
   {
     "scripts": {
       "build": "webpack --mode production",
       "watch": "webpack --watch --mode development",
       "dev": "webpack-dev-server --mode development"
     }
   }
   ```

## Usage

### Basic Commands

```bash
# Start Rails server only
dev-rails

# Start npm watch only
dev-npm

# Start both Rails server and npm watch
dev-both

# Run npm build
dev-build

# Check status
dev-status

# Stop all processes
dev-stop
```

### Quick Shortcuts

```bash
dev    # Start both (same as dev-both)
devs   # Show status
devk   # Kill all processes
```

### Enhanced Rails Server Aliases

```bash
s3dev  # Rails server on port 3000 with process management
s4dev  # Rails server on port 4000 with process management
s5dev  # Rails server on port 5000 with process management
```

### Enhanced npm Aliases

```bash
npm-dev    # Start npm watch
npm-build  # Run npm build
npm-watch  # Start npm watch
```

### Advanced Usage

```bash
# Start Rails on custom port
RAILS_PORT=4000 dev-rails

# Use custom npm script names
NPM_WATCH_SCRIPT=dev NPM_BUILD_SCRIPT=build-prod dev-npm

# Direct script usage
./dev.sh rails
./dev.sh both
./dev.sh status
```

## Features

### Process Management
- **PID tracking**: Each process is tracked with PID files
- **Graceful shutdown**: Processes are properly terminated on script exit
- **Status checking**: Verify if processes are actually running
- **Duplicate prevention**: Won't start multiple instances

### Error Handling
- **Dependency checking**: Verifies Rails and npm are installed
- **File validation**: Checks for `package.json` existence
- **Process validation**: Confirms processes started successfully
- **Exit codes**: Proper error codes for automation

### Logging
- **Separate log files**: Rails and npm logs are saved separately
- **Color-coded output**: Easy to distinguish different message types
- **Status messages**: Clear feedback on what's happening

### Environment Variables
- `RAILS_PORT` - Rails server port (default: 3000)
- `NPM_WATCH_SCRIPT` - npm watch script name (default: watch)
- `NPM_BUILD_SCRIPT` - npm build script name (default: build)

## Integration with Existing Aliases

This setup integrates seamlessly with your existing aliases:
- Your existing Rails server aliases (`s3`, `s4`, etc.) still work
- New development aliases provide enhanced process management
- All existing git and other aliases remain unchanged

## Troubleshooting

### Common Issues

1. **"Rails command not found"**
   - Make sure Rails is installed: `gem install rails`

2. **"npm command not found"**
   - Make sure Node.js is installed: `brew install node`

3. **"package.json not found"**
   - Make sure you're in the correct directory (Rails project root)

4. **Process won't start**
   - Check logs: `tail -f /tmp/rails.log` or `tail -f /tmp/npm.log`
   - Kill existing processes: `dev-stop`

### Log Files

- Rails logs: `/tmp/rails.log`
- npm logs: `/tmp/npm.log`
- PID files: `/tmp/dev-scripts/`

## Examples

### Typical Development Workflow

```bash
# Start development environment
dev

# Check status
devs

# Stop everything when done
devk
```

### Custom Configuration

```bash
# Start Rails on port 4000 and npm with custom script
RAILS_PORT=4000 NPM_WATCH_SCRIPT=dev dev-both
```

### Integration with Existing Workflow

```bash
# Your existing aliases still work
s3  # rails s (port 3000)

# New enhanced aliases
s3dev  # Rails with process management
``` 