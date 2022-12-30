#!/bin/zsh

sudo -v

echo "Installing rbenv-aliases"
mkdir -p "$(rbenv root)/plugins"
git clone https://github.com/tpope/rbenv-aliases.git "$(rbenv root)/plugins/rbenv-aliases"
rbenv alias --auto
echo "Done"

echo "Installing Ruby 3.0.3"
rbenv install $(rbenv install -l | grep -v - | tail -1)
echo "Done"

echo "Installing Ruby gems"
bundle install --gemfile=50_ruby/Gemfile
rm 50_ruby/Gemfile.lock
echo "Done"
