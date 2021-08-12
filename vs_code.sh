#!/bin/zsh

# Define a function which rename a `target` file to `target.backup` if the file
# exists and if it's a 'real' file, ie not a symlink
backup() {
  target=$1
  if [ -e "$target" ]; then
    if [ ! -L "$target" ]; then
      mv "$target" "$target.backup"
      echo "-----> Moved your old $target config file to $target.backup"
    fi
  fi
}

symlink() {
  file=$1
  link=$2
  if [ ! -e "$link" ]; then
    echo "-----> Symlinking your new $link"
    ln -s $file $link
  fi
}

# Symlink VS Code settings to the present `settings.json` file
# If it's a macOS
if [[ `uname` =~ "Darwin" ]]; then
  CODE_PATH=~/Library/Application\ Support/Code/User
# Else, it's a Linux
else
  CODE_PATH=~/.config/Code/User
  # If this folder doesn't exist, it's a WSL
  if [ ! -e $CODE_PATH ]; then
    CODE_PATH=~/.vscode-server/data/Machine
  fi
fi
target="$CODE_PATH/settings.json"
backup $target
symlink $PWD/settings.json $target

echo "👌 Carry on with VSCODEsetup!"
