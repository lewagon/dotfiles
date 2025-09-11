# Dotfiles

Personal dotfiles configuration for macOS development environment. Originally forked from [Le Wagon](https://www.lewagon.com)'s bootcamp configuration and extensively customized for Rails + React/npm development workflow.

## Features

- **Rails + npm Development Workflow**: Comprehensive script and aliases for managing Rails servers and npm processes
- **Enhanced Git Workflow**: Custom aliases for pull requests, branch management, and common operations
- **Server Management**: Easy aliases for running multiple Rails servers on different ports
- **Process Management**: Start, stop, and monitor development servers with ease
- **Shell Customization**: Extensive zsh configuration with syntax highlighting and productivity aliases

## Core Tools

- [oh-my-zsh](http://ohmyz.sh/) - Zsh framework with plugins
- [Sublime Text](https://www.sublimetext.com/) - Primary text editor
- [git](https://git-scm.com/) - Version control with custom aliases
- Ruby via [`rbenv`](https://github.com/rbenv/rbenv) - Ruby version management
- Python via [`pyenv`](https://github.com/pyenv/pyenv) - Python version management
- Node.js via [`nvm`](https://github.com/nvm-sh/nvm) - Node version management

## Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/AzCez/dotfiles.git ~/dotfiles

# Run the installation script
cd ~/dotfiles && ./install.sh

# Reload your shell
source ~/.zshrc
```

### Development Workflow
```bash
# Start Rails + npm development environment
dev          # Start both Rails server and npm watch
devs         # Check status
devk         # Stop all processes

# Individual processes
dev-rails    # Rails server only
dev-npm      # npm watch only
dev-build    # Run npm build
```

### Server Management
```bash
# Rails servers on different ports
s3           # Port 3000
s4           # Port 4000
s5           # Port 5000

# Enhanced versions with process management
s3dev        # Rails on 3000 with PID tracking
s4dev        # Rails on 4000 with PID tracking
```

## File Structure

- `zshrc` - Zsh configuration with plugins and PATH setup
- `aliases` - Custom shell aliases for development workflow
- `gitconfig` - Git configuration with custom aliases
- `dev.sh` - Rails + npm development script with process management
- `README-dev.md` - Detailed documentation for development setup
- `install.sh` - Automated installation script

## Development Features

### Process Management
- PID tracking for all development processes
- Graceful shutdown and cleanup
- Status monitoring and health checks
- Prevents duplicate process instances

### Git Workflow Enhancement
- Pull request automation (`git pr`, `git pr-main`)
- Branch management helpers
- Enhanced logging and status commands

### Rails Development
- Multiple server instances on different ports
- Database management shortcuts (`rdb`, `rdm`, `rds`)
- Heroku deployment helpers

For detailed usage instructions, see [README-dev.md](README-dev.md).
