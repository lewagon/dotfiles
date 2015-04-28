Install
-------

**Assumption**: you have [`oh-my-zsh`](http://ohmyz.sh/) is already installed.

Your dotfiles are personal. [Fork this repo](https://github.com/lewagon/dotfiles/fork) on Github, and then clone it on your computer.

```
# Don't blindly copy paste this line, type it and put *your*
$ GITHUB_USERNAME=my_github_username
```

```
# Sure you did not just copy paste the previous line? Sure? OK go on!
# You can now blinly copy paste this line *without changing anything*
$ mkdir -p ~/code/$GITHUB_USERNAME && cd $_ && git clone git@github.com:$GITHUB_USERNAME/dotfiles.git && cd dotfiles
```

Run the `dotfiles` installer. It will prompt you for your name and your email.

```bash
$ zsh install.sh
```

You're all set! Go back to [lewagon/setup](https://github.com/lewagon/setup)