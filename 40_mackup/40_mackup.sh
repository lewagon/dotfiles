#!/bin/zsh

ln -s $HOME"/Library/Mobile Documents/com~apple~CloudDocs/Mackup/.mackup.cfg" ~

mackup restore

gpg --import-options restore --import /.gnupg/jmschp_private.gpg
