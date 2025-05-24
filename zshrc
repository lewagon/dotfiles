ZSH=$HOME/.oh-my-zsh
ZSH_THEME="robbyrussell"

# ─── OVERRIDE for zsh-syntax-highlighting ─────────────────────────────────
# Point plugin to your clone *before* we load OMZ:
export ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR="$ZSH/custom/plugins/zsh-syntax-highlighting/highlighters"

# Oh-My-Zsh plugins
# plugins=(git gitfast last-working-dir common-aliases sublime history-substring-search git-open)
plugins=(
  git
  gitfast
  last-working-dir
  common-aliases
  sublime
  history-substring-search
  zsh-syntax-highlighting
  git-open
)


# Disable Homebrew analytics
export HOMEBREW_NO_ANALYTICS=1 

# Load Oh-My-Zsh
source "${ZSH}/oh-my-zsh.sh"
unalias rm

# Ruby (rbenv)
export PATH="$HOME/.rbenv/bin:$PATH"
type -a rbenv > /dev/null && eval "$(rbenv init -)"

# Python (pyenv)
export PATH="$HOME/.pyenv/bin:$PATH"
type -a pyenv > /dev/null && eval "$(pyenv init -)" && eval "$(pyenv virtualenv-init -)"

# Node (nvm)
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

# Project paths
export PATH="./bin:./node_modules/.bin:$PATH:/usr/local/sbin"

# Aliases
[[ -f "$HOME/.aliases" ]] && source "$HOME/.aliases"

# Encoding
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Go
export GOPATH=$HOME/golang
export GOROOT=/usr/local/opt/go/libexec
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOBIN:$GOROOT/bin

# RVM
export PATH="$PATH:$HOME/.rvm/bin"

# Editor
export BUNDLER_EDITOR="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl' -a"

# ✅ ZSH Syntax Highlighting
# ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR=$HOME/.zsh/zsh-syntax-highlighting/highlighters
# source $HOME/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
# export ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR="$HOME/.zsh/zsh-syntax-highlighting/highlighters"
# source "$HOME/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# ✅ ZSH Syntax Highlighting (manual override)
export ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR="$ZSH/custom/plugins/zsh-syntax-highlighting/highlighters"
source "$ZSH/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"


# ✅ Antigen (if you really need it, optional)
# # ─── Antigen Plugin Manager ───────────────────────────────────────────────
# source ~/.antigen.zsh

# # Initialize Antigen
# antigen init

# # Bundles
# antigen bundle robbyrussell/oh-my-zsh
# antigen bundle zsh-users/zsh-syntax-highlighting
# antigen bundle paulirish/git-open

# # Apply!
# antigen apply

export BUNDLER_EDITOR="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl' -a"
