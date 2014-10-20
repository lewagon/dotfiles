Install
-------

Your dotfiles are personal. [Fork this repo](https://github.com/lewagon/dotfiles/fork) on Github,
and then clone it on your computer.


**Disclaimer**: replace `<put_your_github_username_here>` by your Github username **without the `< >`**


```bash
# Create a global variable storing
# You need to replace what's *after* the equal sign by your own github username (case sensitive)
#
# e.g.: GITHUB_USERNAME=ssaunier
#
$ GITHUB_USERNAME=<put_your_github_username_here>

# Then execute the 3 following lines without changing anything
$ mkdir -p ~/code/$GITHUB_USERNAME && cd $_
$ git clone git@github.com:$GITHUB_USERNAME/dotfiles.git
$ cd dotfiles
```


Open the `gitconfig` file with Sublime Text. You can run the
following to open your Finder:

```bash
$ open .
```

Edit & save the `[user]`'s section of the `gitconfig` file.

Save your identity configuration, and push it to GitHub.

```bash
$ git add gitconfig
$ git commit --message "My identity for @lewagon in the gitconfig"
$ git push origin master
```

You can review your changes here:

```bash
$ open https://github.com/$GITHUB_USERNAME/dotfiles
```

Now you can run the install script. It will not override existing config files.
Assumption: you have [`oh-my-zsh`](http://ohmyz.sh/) is already installed.

```bash
$ ./install.sh
```

Customization
-------------

You can open `~/.aliases` and add your own shortcuts
