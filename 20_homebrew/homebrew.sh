#!/bin/zsh

echo "Installing Homebrew"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo "Done"

echo "Installing Brew formulae"
brew bundle --no-lock --file=20_homebrew/Brewfile
echo "Done"

echo "Installing Brew casks"
brew bundle --no-lock --file=20_homebrew/Caskfile
echo "Done"

exit
