Install
-------

Your dotfiles are personal. [Fork this repo](https://github.com/ssaunier/dotfiles/fork_select) on Github.
And then get it on your computer.

    git clone git@github.com:#{you}/dotfiles.git
    cd dotfiles
    ./install.sh

There is configuration for `zsh` so switch your shell from the default `bash` to `zsh` on OS X:

    chsh -s /bin/zsh

Oh-my-zsh plugins used:

    mkdir -p ~/.oh-my-zsh/custom/plugins && cd ~/.oh-my-zsh/custom/plugins
    git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
    git clone git://github.com/zsh-users/zsh-history-substring-search.git


Customization
-------------

You will want to customize your environment. We suggest making changes in files that are not in thoughtbot's files.

For example, to customize your `zsh` config, make your changes in `~/.zshenv`:

    # RVM
    [[ -s '/Users/ssaunier/.rvm/scripts/rvm' ]] && source '/Users/ssaunier/.rvm/scripts/rvm'

    # recommended by brew doctor
    export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

Readme based on https://raw.github.com/thoughtbot/dotfiles/master/README.md