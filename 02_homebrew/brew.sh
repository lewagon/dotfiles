#!/bin/zsh

echo "Installing Homebrew"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo "Done"

echo "Installing Brew formulae"
brew bundle --file=./Brewfile
echo "Done"

echo "Installing Brew casks"
brew bundle --file=./Caskfile
echo "Done"
exit
