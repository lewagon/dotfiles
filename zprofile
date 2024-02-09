# Setup the PATH for pyenv binaries and shims
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
type -a pyenv > /dev/null && eval "$(pyenv init --path)"

# Created by `pipx` on 2023-04-06 08:39:48
export PATH="$PATH:/home/lscr/.local/bin"
