Install
-------

Your dotfiles are personal. [Fork this repo](https://github.com/lewagon/dotfiles/fork) on Github,
and then clone it on your computer.

```bash
$ GITHUB_USERNAME=<put_your_github_username_here>

# Then execute the 3 following lines without changing anything
$ mkdir -p ~/code/${GITHUB_USERNAME} && cd $_
$ git clone git@github.com:${GITHUB_USERNAME}/dotfiles.git
$ cd dotfiles
```

Open and edit the `[user]`'s section of the `gitconfig` file. When you're done, save these config (that's why you forked the repo) and pushed it on GitHub.

Now you can run the install script. It will not override existing config files, just
rename them as ```#{file}.backup```.
Assumption: you have [`oh-my-zsh`](http://ohmyz.sh/) is already installed.

```bash
$ ./install.sh
```

Save your identity configuration

```bash
$ git add gitconfig
$ git commit --message "My identity in the gitconfig"
$ git push origin master
```

Customization
-------------

You can open `~/.aliases` and add your own shortcuts
