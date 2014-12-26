Install
-------

**Assumption**: you have [`oh-my-zsh`](http://ohmyz.sh/) is already installed.

Your dotfiles are personal. [Fork this repo](https://github.com/lewagon/dotfiles/fork) on Github, and then clone it on your computer.

```bash
# Create a global variable storing
# You need to replace what's *after* the equal sign by your own github username (case sensitive)
#
# e.g.: GITHUB_USERNAME=ssaunier
#
$ GITHUB_USERNAME=put_your_github_username_here
```

Then execute the 3 following lines **without changing** anything:

```
$ mkdir -p ~/code/$GITHUB_USERNAME && cd $_
$ git clone git@github.com:$GITHUB_USERNAME/dotfiles.git
$ cd dotfiles
```

Run the `dotfiles` installer:

```bash
$ ./install.sh
```

Some files have been updated, you should push this changes back to GitHub.

```bash
$ git add gitconfig
$ git commit --message "My identity for @lewagon in the gitconfig"
$ git push origin master
```

You're all set! Go back to [lewagon/setup](https://github.com/lewagon/setup)