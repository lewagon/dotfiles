## Configuration

Hackers love to refine and polish their shell and tools. We'll start with a great default configuration provided by [Le Wagon](http://github.com/lewagon/dotfiles), stored on Github.

As your configuration is personal, you need your own repository storing it, so you first need to fork it to your GitHub account.

Go to [this page](https://github.com/lewagon/dotfiles/fork) and for the repository.

Then open your terminal, and run:

```shell
USER=<type_your_github_username>

mkdir -p ~/code/$USER && cd $_
git clone git@github.com:${USER}/dotfiles.git
cd dotfiles
```

We now need to configure the `gitconfig` with your own identity. Open it in Sublime Text, and update line 2 and 3:

```
[user]
  name =  "TODO: PUT YOUR NAME HERE WITHOUT ACCENTS"
  email = "TODO: PUT YOUR GITHUB ACCOUNT EMAIL HERE"
```

You should commit this change:

```shell
git add gitconfig
git commit --message "Added my identity to the gitconfig"
git push origin master
```

Time to install this default configuration, just run:

```shell
./install.sh
```

Quit and relaunch your terminal. You should be all set!