#!/bin/zsh

sudo -v

echo "Creating XDG Base Directory Specification"
mkdir -p "$HOME/.cache"
mkdir -p "$HOME/.config"
mkdir -p "$HOME/.local/share"
mkdir -p "$HOME/.local/state"
mkdir -p "$HOME/.local/runtime"
chmod 0700 "$HOME/.local/runtime"
echo "Done"

echo "Exporting XDG_CONFIG_HOME environement variable"
touch "$HOME/.zshenv"
echo export XDG_CACHE_HOME=$HOME/.cache >> "$HOME/.zshenv"
echo export XDG_CONFIG_HOME=$HOME/.config >> "$HOME/.zshenv"
echo export XDG_DATA_HOME=$HOME/.local/share >> "$HOME/.zshenv"
echo export XDG_STATE_HOME=$HOME/.local/state >> "$HOME/.zshenv"
echo export XDG_DATA_DIRS="/usr/local/share/:/usr/share/:/opt/homebrew/share" >> "$HOME/.zshenv"
echo export XDG_RUNTIME_DIR="$HOME/.local/runtime" >> "$HOME/.zshenv"
echo "Done"
