#!/bin/zsh

echo "Creating config folder"
mkdir -p "${HOME}/.config"
echo "Done"

echo "Exporting XDG_CONFIG_HOME environement variable"
touch ~/.zshenv
echo export XDG_CONFIG_HOME=$HOME/.config >> ~/.zshenv
echo "Done"

exit