#!/bin/zsh

export XDG_CONFIG_HOME=$HOME/.config

echo "Installing Ruby 3.0.3"
rbenv install 3.0.3
echo "Done"

echo "Installing Ruby 3.0.3"
bundle install --gemfile=50_ruby/Gemfile
rm 50_ruby/Gemfile.lock
echo "Done"
