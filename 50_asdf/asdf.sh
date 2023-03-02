#!/bin/zsh

sudo -v

# Add nodejs plugin
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
# Add yarn plugin
asdf plugin-add yarn
# Add rubby plugin
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git

asdf install