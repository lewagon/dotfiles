#!/bin/bash

# make sure directory path is ok when script is started from anywhere
MYDIR="$(dirname -- "$0")"

#git config
rm -rf ~/.gitconfig
cp $MYDIR/gitconfig ~/.gitconfig

# .zshrc install
rm -rf ~/.zshrc
cp $MYDIR/zshrc ~/.zshrc

# .vimrc install
rm -rf ~/.vimrc
cp $MYDIR/vimrc ~/.vimrc

# .tm_properties install
rm -rf ~/.tm_properties
cp $MYDIR/tm_properties ~/.tm_properties

# .rspec install
rm -rf ~/.rspec
cp $MYDIR/rspec ~/.rspec

# .irbrc install
rm -rf ~/.irbrc
cp $MYDIR/irbrc ~/.irbrc

# .profile and .zprofile install
rm -rf ~/.profile || true
cp -r $MYDIR/profile ~/.profile
rm -rf ~/.zprofile || true
cp -r $MYDIR/zprofile ~/.zprofile

# iterm2 config (sensible for mac only)
case $OSTYPE in
    darwin*)
        # Specify the preferences directory
        defaults write com.googlecode.iterm2.plist PrefsCustomFolder -string "~/dotfiles/iterm2"
        # Tell iTerm2 to use the custom preferences in the directory
        defaults write com.googlecode.iterm2.plist LoadPrefsFromCustomFolder -bool true
        ;;
esac

# .bash_aliases install
cp $MYDIR/bash_aliases ~/.bash_aliases
if [ -f ~/.zshrc ]; then
    echo "[ -f ~/.bash_aliases ] && source ~/.bash_aliases" >> ~/.zshrc
fi


echo "dotfiles finished installing!"
