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

# For all files `$name` in the present folder except `*.sh`, `README.md`, `settings.json`,
# and `config`, backup the target file located at `~/.$name` and symlink `$name` to `~/.$name`
for name in aliases gitconfig irbrc pryrc rspec zprofile zshrc p10k; do
  if [ ! -d "$name" ]; then
    target="$HOME/.$name"
    backup $target
    symlink $PWD/$name $target
  fi
done

# Install zsh-syntax-highlighting plugin
CURRENT_DIR=`pwd`
ZSH_PLUGINS_DIR="$HOME/.oh-my-zsh/custom/plugins"
mkdir -p "$ZSH_PLUGINS_DIR" && cd "$ZSH_PLUGINS_DIR"
if [ ! -d "$ZSH_PLUGINS_DIR/zsh-syntax-highlighting" ]; then
  echo "-----> Installing zsh plugins..."
  git clone https://github.com/zsh-users/zsh-autosuggestions
  git clone https://github.com/zsh-users/zsh-syntax-highlighting
  git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git fast-syntax-highlighting
  git clone https://github.com/MichaelAquilina/zsh-you-should-use.git you-should-use
fi
cd "$CURRENT_DIR"

# Symlink VS Code settings and keybindings to the present `settings.json` and `keybindings.json` files
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

for name in settings.json keybindings.json; do
  target="$CODE_PATH/$name"
  backup $target
  symlink $PWD/$name $target
done

# Ajout du lien pour gitignore_global
if [ ! -e "$HOME/.gitignore_global" ]; then
  echo "-----> Symlinking your new .gitignore_global"
  ln -s $PWD/.gitignore_global $HOME/.gitignore_global
fi

# Symlink SSH config file to the present `config` file for macOS and add SSH passphrase to the keychain
if [[ `uname` =~ "Darwin" ]]; then
  target=~/.ssh/config
  backup $target
  symlink $PWD/config $target
  # Copier la clé publique si elle n'existe pas
  if [ ! -f ~/.ssh/id_ed25519.pub ]; then
    cp $PWD/id_ed25519.pub ~/.ssh/id_ed25519.pub
    chmod 644 ~/.ssh/id_ed25519.pub
  fi
  ssh-add --apple-use-keychain ~/.ssh/id_ed25519
fi

# Refresh the current terminal with the newly installed configuration
exec zsh

echo "👌 Carry on with git setup!"
