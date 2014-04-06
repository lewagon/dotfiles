Install
-------

Your dotfiles are personal. [Fork this repo](https://github.com/lewagon/dotfiles/fork) on Github,
and then clone it on your computer.

```bash
$ GITHUB_USERNAME=<put_your_github_username_here>
$ mkdir -p ~/code/${GITHUB_USERNAME} && cd $_
$ git clone git@github.com:${GITHUB_USERNAME}/dotfiles.git
$ cd dotfiles
```

Open and edit the ```gitconfig``` and other files with your own preferences. When you're done, save these config (that's why you forked the repo).

```bash
$ git add gitconfig
$ git commit m "My identity in the gitconfig"
$ git push origin master
```

Now you can run the install script. It will not override existing config files, just
rename them as ```#{file}.backup```.
Assumption: you have [`oh-my-zsh`](http://ohmyz.sh/) is already installed.

```bash
$ ./install.sh
```

Customization
-------------

You can open `~/.aliases` and add your own shortcuts

You will want to customize your environment, just open `~/.zshenv` and
stick all the variables you need:

```bash
# Amazon credentials
export AMAZON_ACCESS_KEY=________________________
export AMAZON_SECRET_KEY=_______________________
```