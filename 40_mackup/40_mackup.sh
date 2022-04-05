#!/bin/zsh
export XDG_CONFIG_HOME=$HOME/.config

ln -s $HOME"/Library/Mobile Documents/com~apple~CloudDocs/Mackup/.mackup.cfg" ~/

mackup restore
