#!/bin/zsh

sudo -v

if [[ $(uname -m) == 'arm64' ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

ln -s $HOME"/Library/Mobile Documents/com~apple~CloudDocs/Mackup/.mackup.cfg" ~

mackup restore

gpg --import-options restore --import ~/.gnupg/jmschp_private.gpg
