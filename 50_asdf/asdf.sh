#!/bin/zsh

sudo -v

asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git

asdf plugin add python

asdf plugin add rust

asdf plugin add alias

asdf install
