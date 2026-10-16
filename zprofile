# Setup the PATH for Homebrew on Apple Silicon
eval "$(/opt/homebrew/bin/brew shellenv 2> /dev/null)"

# Setup the PATH for pyenv binaries and shims
# Uncomment the next lines if you still run a pyenv based setup
# export PYENV_ROOT="$HOME/.pyenv"
# export PATH="$PYENV_ROOT/bin:$PATH"
# type -a pyenv > /dev/null && eval "$(pyenv init --path)"
