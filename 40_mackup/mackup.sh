#!/bin/zsh

sudo -v

# Add Homebrew executable to PATH
eval "$(/opt/homebrew/bin/brew shellenv)"

ln -s $HOME"/Library/Mobile Documents/com~apple~CloudDocs/Mackup/.mackup.cfg" ~

mackup restore

gpg --import-options restore --import ~/.gnupg/jmschp_private.gpg
