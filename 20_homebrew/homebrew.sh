#!/bin/zsh

sudo -v

echo "Installing Homebrew"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo "Done"

echo "Add brew to PATH"
# Set PATH, MANPATH, etc., for Homebrew.
if [[ $(uname -m) == 'arm64' ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
echo "Done"

echo "Installing Brew formulae"
brew bundle --no-lock --file=20_homebrew/Brewfile
echo "Done"

echo "Installing Brew casks"
brew bundle --no-lock --file=20_homebrew/Caskfile
echo "Done"

exit
