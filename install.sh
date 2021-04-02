backup() {
  target=$1
  if [ -e "$target" ]; then           # Does the config file already exist?
    if [ ! -L "$target" ]; then       # as a pure file?
      mv "$target" "$target.backup"   # Then backup it
      echo "-----> Moved your old $target config file to $target.backup"
    fi
  fi
}

#!/bin/zsh
for name in *; do
  if [ ! -d "$name" ]; then
    target="$HOME/.$name"
    if [[ ! "$name" =~ '\.sh$' ]] && [ "$name" != 'README.md' ] && [[ ! "$name" != 'vscode_settings.json' ]]; then
      backup $target

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
  git clone https://github.com/zsh-users/zsh-autosuggestions
  git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
fi
cd "$CURRENT_DIR"

setopt nocasematch
if [[ ! `uname` =~ "darwin" ]]; then
  git config --global core.editor "code -n -w $@ >/dev/null 2>&1"
  echo 'export BUNDLER_EDITOR="code $@ >/dev/null 2>&1 -a"' >> zshrc
else
  git config --global core.editor "'/usr/local/bin/code' -n -w"
  bundler_editor="'/usr/local/bin/code'"
  echo "export BUNDLER_EDITOR=\"${bundler_editor} -a\"" >> zshrc
fi

# VS Code
if [[ ! `uname` =~ "darwin" ]]; then
  CODE_PATH=~/.config/Code/User
else
  CODE_PATH=~/Library/Application\ Support/Code/User
fi
backup "$CODE_PATH/settings.json"
ln -s $PWD/vscode_settings.json $CODE_PATH/settings.json

zsh ~/.zshrc

echo "👌  Carry on with git setup!"
