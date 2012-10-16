Install
-------

Your dotfiles are personal. Fork this repo on Github, and then get it on your computer.

    git clone git@github.com:#{you}/dotfiles.git
    cd dotfiles

Then edit the ```gitconfig``` and other files with your own preferences. Then when you're done,
save these config (that's why you forked the repo).

    git commit -am "My identity in the gitconfig"
    git push origin master

Now you can run the install script. It will not override existing config files, just
rename them as ```#{file}.backup```.

    ./install.sh

There is configuration for `zsh` so switch your shell from the default `bash` to `zsh` on OS X:

    chsh -s /bin/zsh


Customization
-------------

You will want to customize your environment.

For example, to customize your `zsh` config, make your changes in `~/.zshenv`:

    # Me
    export EMAIL=__________________

    # Amazon credentials
    export AMAZON_ACCESS_KEY=________________________
    export AMAZON_SECRET_KEY=_______________________

You can set up your aliases in `~/.aliases`, they will be loaded up automatically.
For example:

    alias rtest='bundle exec rake test && bundle exec rake spec && open coverage/index.html'

    alias bi='bundle install'
    alias be='bundle exec'


Staying up to date
------------------

You can add this repo as a remote if you want to keep your fork synchronized
with [ssaunier/dotfiles](https://github.com/ssaunier/dotfiles)'s changes.

    git remote add upstream git@github.com:ssaunier/dotfiles.git

Once your remote is there and you want to get all the last stuff, run

    git fetch upstream
    git checkout master
    git merge upstream/master
    git push origin master

Readme based on https://raw.github.com/thoughtbot/dotfiles/master/README.md

