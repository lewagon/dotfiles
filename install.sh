#!/bin/bash

# make sure directory path is ok when script is started from anywhere
MYDIR="$(dirname -- "$0")"

#git config
rm -rf ~/.gitconfig || true
ln -s ~/workspace/perso/dotfiles/gitconfig ~/.gitconfig

# .zshrc install
rm -rf ~/.zshrc || true
ln -s ~/workspace/perso/dotfiles/zshrc ~/.zshrc

# .vimrc install
rm -rf ~/.vimrc || true
ln -s ~/workspace/perso/dotfiles/init.vim ~/.vimrc

# .tm_properties install
rm -rf ~/.tm_properties || true
ln -s ~/workspace/perso/dotfiles/tm_properties ~/.tm_properties

# .rspec install
rm -rf ~/.rspec || true
ln -s ~/workspace/perso/dotfiles/rspec ~/.rspec

# .irbrc install
rm -rf ~/.irbrc || true
ln -s ~/workspace/perso/dotfiles/irbrc ~/.irbrc

# .profile and .zprofile install
rm -rf ~/.profile || true
ln -s ~/workspace/perso/dotfiles/profile ~/.profile
rm -rf ~/.zprofile || true
ln -s ~/workspace/perso/dotfiles/zprofile ~/.zprofile

# installing z script
rm -rf ~/z.sh || true
ln -s ~/workspace/perso/dotfiles/z ~/z.sh

# iterm2 config (sensible for mac only)
case $OSTYPE in
    darwin*)
        # Specify the preferences directory
        defaults write com.googlecode.iterm2.plist PrefsCustomFolder -string "~/workspace/perso/dotfiles/iterm2"
        # Tell iTerm2 to
        defaults write com.googlecode.iterm2.plist LoadPrefsFromCustomFolder -bool true
        ;;
esac

# .bash_aliases install
rm -rf ~/.aliases || true
ln -s ~/workspace/perso/dotfiles/aliases ~/.aliases

# .ackrc install
rm -rf ~/.ackrc || true
ln -s ~/workspace/perso/dotfiles/ackrc ~/.ackrc

# starship.toml install
rm -rf ~/.config/starship.toml || true
ln -s ~/workspace/perso/dotfiles/starship.toml ~/.config/starship.toml

# init.vim install
mv ~/.config/nvim /tmp || true
mkdir ~/.config/nvim
ln -s ~/workspace/perso/dotfiles/init.vim ~/.config/nvim/init.vim

# install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

echo " ##### dotfiles finished installing! ##### "
