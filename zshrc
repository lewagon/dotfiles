# path to your Oh-My-Zsh installation
ZSH=$HOME/.oh-my-zsh

# choose a theme
ZSH_THEME="robbyrussell"

# only Oh-My-Zsh plugins you want
plugins=(
  git
  gitfast
  last-working-dir
  common-aliases
  sublime
  history-substring-search
  git-open
)

# macOS-only: disable Homebrew analytics
export HOMEBREW_NO_ANALYTICS=1

# load Oh-My-Zsh
source "${ZSH}/oh-my-zsh.sh"

# drop interactive rm alias from common-aliases
unalias rm

# Custom functions & PATH tweaks

# 1. Open files or folders in the Cursor IDE
c() { open -a "Cursor" "$@"; }  # defines `c` to launch the Cursor app with given file/dir

# 2. rbenv (Ruby version manager)
export PATH="${HOME}/.rbenv/bin:${PATH}"           # add rbenv’s bin to PATH
type -a rbenv >/dev/null && eval "$(rbenv init -)" # initialize rbenv shims & autocompletion if installed

# 3. pyenv (Python version manager)
export PATH="${HOME}/.pyenv/bin:${PATH}"                                              # add pyenv’s bin to PATH
type -a pyenv >/dev/null && eval "$(pyenv init -)" && eval "$(pyenv virtualenv-init -)" # initialize pyenv and its virtualenv plugin

# 4. nvm (Node version manager)
export NVM_DIR="$HOME/.nvm"                                  # point NVM_DIR to your nvm installation
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # load nvm if present
[ -s "/usr/local/opt/nvm/bash_completion" ] && . "/usr/local/opt/nvm/bash_completion"  # load nvm bash_completion

# 5. Local project bin folders & sbin
export PATH="./bin:./node_modules/.bin:${PATH}:/usr/local/sbin"  # prioritize project-local scripts and Homebrew sbin

# 6. User-defined aliases
[[ -f "$HOME/.aliases" ]] && source "$HOME/.aliases"  # load personal aliases if the file exists

# 7. Locale settings
export LANG=en_US.UTF-8   # set default language encoding
export LC_ALL=en_US.UTF-8 # set all locale categories to UTF-8

# 8. Go language setup
export GOPATH=$HOME/golang                                 # workspace for Go projects
export GOROOT=/usr/local/opt/go/libexec                    # Go installation root
export GOBIN=$GOPATH/bin                                   # install Go binaries here
export PATH=$PATH:$GOPATH:$GOROOT/bin                      # add Go paths to PATH

# 9. RVM (Ruby Version Manager) & Bundler editor
export PATH="$PATH:$HOME/.rvm/bin"                                           # add RVM to PATH
export BUNDLER_EDITOR="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl' -a"  # use Sublime Text to edit Gemfile conflicts

# 10. Zsh syntax highlighting
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh  # enable real-time syntax coloring

# 11. Reload shortcut
alias reload='source ~/.zshrc'  # one-word command to re-source your config
