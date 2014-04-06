for name in *; do
  if [ ! -d "$name" ]; then
    target="$HOME/.$name"
    if [[ ! "$name" =~ '\.sh$' ]] && [ "$name" != 'README.md' ]; then
      if [ -e "$target" ]; then           # Does the config file already exist?
        if [ ! -L "$target" ]; then       # as a pure file?
          mv "$target" "$target.backup"   # Then backup it
          echo "-----> Moved your old $target config file to $target.backup"
        fi
      fi

      if [ ! -e "$target" ]; then
        echo "-----> Symlinking your new $target"
        ln -s "$PWD/$name" "$target"
      fi
    fi
  fi
done

REGULAR="\\033[0;39m"
YELLOW="\\033[1;33m"
GREEN="\\033[1;32m"

# zsh plugins
CURRENT_DIR=`pwd`
ZSH_PLUGINS_DIR="$HOME/.oh-my-zsh/custom/plugins"
mkdir -p "$ZSH_PLUGINS_DIR" && cd "$ZSH_PLUGINS_DIR"
if [ ! -d "$ZSH_PLUGINS_DIR/zsh-syntax-highlighting" ]; then
  echo "-----> Installing zsh plugin 'zsh-syntax-highlighting'..."
  git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
fi
if [ ! -d "$ZSH_PLUGINS_DIR/zsh-history-substring-search" ]; then
  echo "-----> Installing zsh plugin 'zsh-history-substring-search'..."
  git clone git://github.com/zsh-users/zsh-history-substring-search.git
fi
cd "$CURRENT_DIR"

# zshenv
if [ ! -e "$HOME/.zshenv" ]; then
  touch "$HOME/.zshenv"
fi

echo "You should quit and relaunch your terminal!"