#!/bin/bash

# make sure directory path is ok when script is started from anywhere
MYDIR="$(dirname -- "$0")"

#git config
rm -rf ~/.gitconfig || true
ln -s ~/workspace/xavierosee/dotfiles/gitconfig ~/.gitconfig

# .bashrc install
rm -rf ~/.bashrc || true
ln -s ~/workspace/xavierosee/dotfiles/bashrc ~/.bashrc

# .vimrc install
rm -rf ~/.vimrc || true
ln -s ~/workspace/xavierosee/dotfiles/init.vim ~/.vimrc

# .tm_properties install
rm -rf ~/.tm_properties || true
ln -s ~/workspace/xavierosee/dotfiles/tm_properties ~/.tm_properties

# .rspec install
rm -rf ~/.rspec || true
ln -s ~/workspace/xavierosee/dotfiles/rspec ~/.rspec

# .irbrc install
rm -rf ~/.irbrc || true
ln -s ~/workspace/xavierosee/dotfiles/irbrc ~/.irbrc

# .profile and .zprofile install
rm -rf ~/.profile || true
ln -s ~/workspace/xavierosee/dotfiles/profile ~/.profile

# installing z script
rm -rf ~/.z.sh || true
ln -s ~/workspace/xavierosee/dotfiles/bin/z ~/.z.sh

# .aliases install
rm -rf ~/.aliases || true
ln -s ~/workspace/xavierosee/dotfiles/aliases ~/.aliases

# .ackrc install
rm -rf ~/.ackrc || true
ln -s ~/workspace/xavierosee/dotfiles/ackrc ~/.ackrc

# init.vim install
mv ~/.config/nvim /tmp || true
mkdir ~/.config/nvim
ln -s ~/workspace/xavierosee/dotfiles/init.vim ~/.config/nvim/init.vim

echo " ##### dotfiles finished installing! ##### "
