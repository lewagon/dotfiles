Install
-------

Your dotfiles are personal. Fork this repo on Github, and then get it on your computer.

    git clone git@github.com:#{you}/dotfiles.git
    cd dotfiles

Then edit the ```gitconfig``` and other files with your own preferences. When you're done,
save these config (that's why you forked the repo).

    git commit -am "My identity in the gitconfig"
    git push origin master

Now you can run the install script. It will not override existing config files, just
rename them as ```#{file}.backup```. Assumption: you have `oh-my-zsh` already installed.

    ./install.sh

Customization
-------------

You will want to customize your environment.

For example, to customize your `zsh` config, make your changes in `~/.zshenv`:

    # Me
    export EMAIL=__________________

    # Amazon credentials
    export AMAZON_ACCESS_KEY=________________________
    export AMAZON_SECRET_KEY=_______________________
