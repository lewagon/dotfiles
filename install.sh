#!/bin/bash

# make sure directory path is ok when script is started from anywhere
MYDIR="$(dirname -- "$0")"

# .zshrc install
rm -rf ~/.zshrc
cp $MYDIR/zshrc ~/.zshrc

# .vimrc install
cp $MYDIR/vimrc ~/.vimrc

# .vim install
rm -rf ~/.vim || true
cp -r $MYDIR/vim ~/.vim

# .profile and .zprofile install
rm -rf ~/.profile || true
cp -r $MYDIR/profile ~/.profile
rm -rf ~/.zprofile || true
cp -r $MYDIR/zprofile ~/.zprofile

# nvim install
rm -rf ~/.config/nvim || true
cp -r $MYDIR/nvim ~/.config/nvim

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

# Install coc extensions
vim -c 'CocInstall -sync coc-json coc-html coc-css coc-tsserver coc-prettier coc-go coc-styled-components coc-graphql|q'

echo "dotfiles finished installing!"
