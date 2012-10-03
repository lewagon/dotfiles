Install
-------

Your dotfiles are personal. [Fork this repo](https://github.com/ssaunier/dotfiles/fork_select) on Github.
And then get it on your computer.

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

Readme based on https://raw.github.com/thoughtbot/dotfiles/master/README.md