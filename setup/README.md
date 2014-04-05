# Setup instructions

## Mac Users, install XCode

You need to install XCode so that you have some basic command line tools which are not available by default when buying a Mac.

Click on the  at the top left of your screen and open the App Store. Search for `XCode`, and download it. It is pretty big, so don't do it while tethering...

## Sublime Text - Your text editor

Go to [this page](http://www.sublimetext.com/2) and download Sublime Text 2.

### Package control

We will install its package manager right away to install addons. Launch Sublime Text, then open the console via the `View > Show Console` menu. Then you need to [copy paste some code](https://sublime.wbond.net/installation#st2) in the console.

### Preferences

Go to `Preferences > Settings - Users` and edit the file to have at least this configuration:

```json
{
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "detect_indentation": false,

  "trim_trailing_white_space_on_save": true,
  "draw_white_space": true,
  "use_tab_stops": true,

  "show_minimap": false,
  "rulers": [ 80 ],

  "folder_exclude_patterns":
  [
    "tmp",
    "log",
    ".git",
    "_site",
    ".bundle",
    ".sass-cache"
  ]
}
```

## Oh-my-zsh - Fancy your terminal

When launching your terminal, you are running a shell, which is waiting for your commands, such as:

```shell
ls
```

which list the files of the current directory.

We will use the shell named `zsh` instead of `bash`, the default one. Open your terminal and run:

```shell
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```

On Mac, open Terminal -> Preferences and set the "Pro" theme as default. Quit and relaunch the terminal.

## Homebrew, Mac's missing Package Manager

If you are running Ubuntu, just run,

```shell
apt-get install git
```

On Mac, you need to install [Homebrew](http://brew.sh/). To do so, open your terminal and run:

```shell
ruby <(curl -fsS https://raw.github.com/Homebrew/homebrew/go/install)
```

Then install some useful software:

```shell
brew install vim git node
```

## Your Configuration

Hackers love to refine and polish their shell and tools. We'll start with a great default configuration provided by [Le Wagon](http://github.com/lewagon/dotfiles), stored on Github.

As your configuration is personal, you need your own repository storing it, so you first need to fork it to your GitHub account.

Go to [this page](https://github.com/lewagon/dotfiles/fork) and for the repository.

Then open your terminal, and run:

```shell
mkdir -p ~/code/<user.github_nickname> && cd $_
git clone git@github.com:<user.github_nickname>/dotfiles.git
cd dotfiles
```

We now need to configure the `gitconfig` with your own identity. Open it in Sublime Text, and update line 2 and 3 with:

```
[user]
  name =  "<user.name>"
  email = "<user.email>"
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

## Installing Ruby

You may already have installed ruby, but we are going to do it again using `rbenv`, a manager for installing different Ruby versions on your computer.

Open a terminal, and run:

```shell
curl https://raw.github.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash
```

If you are using Ubuntu, run:

```shell
rbenv bootstrap-ubuntu-12-04
```

Now, you are ready to install the latest ruby version, and set it as the default version.

```shell
rbenv install 2.1.1
rbenv global 2.1.1
ruby -v
```

You should see something starting with `ruby 2.1.1p`

## Bonus: OSX For Hackers

If you are running Ubuntu, you can skip this step.

You want a fast keyboard, so run this in your terminal:

```shell
defaults write NSGlobalDomain KeyRepeat -int 2
defaults write NSGlobalDomain InitialKeyRepeat -int 15
```

You can have a look at [this](https://github.com/mathiasbynens/dotfiles/blob/master/.osx) and run whichever command you see fit.
