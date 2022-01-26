#!/bin/bash

# make sure directory path is ok when script is started from anywhere
MYDIR="$(dirname -- "$0")"

#git config
rm -rf ~/.gitconfig || true
ln -s ~/.gitconfig ~/workspace/xavierosee/dotfiles/gitconfig

# .zshrc install
rm -rf ~/.zshrc || true
ln -s ~/.zshrc ~/workspace/xavierosee/dotfiles/zshrc

# .vimrc install
rm -rf ~/.vimrc || true
ln -s ~/.vimrc ~/workspace/xavierosee/dotfiles/init.vim

# .tm_properties install
rm -rf ~/.tm_properties || true
ln -s ~/.tm_properties ~/workspace/xavierosee/dotfiles/tm_properties

# .rspec install
rm -rf ~/.rspec || true
ln -s ~/.rspec ~/workspace/xavierosee/dotfiles/rspec

# .irbrc install
rm -rf ~/.irbrc || true
ln -s ~/.irbrc ~/workspace/xavierosee/dotfiles/irbrc

# .profile and .zprofile install
rm -rf ~/.profile || true
ln -s ~/.profile ~/workspace/xavierosee/dotfiles/profile
rm -rf ~/.zprofile || true
ln -s ~/.zprofile ~/workspace/xavierosee/dotfiles/zprofile

# installing z script
rm -rf ~/z.sh || true
ln -s ~/z.sh ~/workspace/xavierosee/dotfiles/z

# iterm2 config (sensible for mac only)
case $OSTYPE in
    darwin*)
        # Specify the preferences directory
        defaults write com.googlecode.iterm2.plist PrefsCustomFolder -string "~/dotfiles/iterm2"
        # Tell iTerm2 to
        defaults write com.googlecode.iterm2.plist LoadPrefsFromCustomFolder -bool true
        ;;
esac

# .bash_aliases install
rm -rf ∞/.aliases || true
ln -s ~/.aliases ~/workspace/xavierosee/dotfiles/aliases

# .ackrc install
rm -rf ~/.ackrc || true
ln -s ~/.ackrc ~/workspace/xavierosee/dotfiles/ackrc

# starship.toml install
rm -rf ~/.config/starship.toml || true
ln -s ~/.config/starship.toml ~/workspace/xavierosee/dotfiles/starship.toml

# init.vim install
mv ~/.config/nvim /tmp || true
mkdir ~/.config/nvim
ln -s ~/.config/nvim/init.vim ~/workspace/xavierosee/dotfiles/init.vim

echo " ##### dotfiles finished installing! ##### "
