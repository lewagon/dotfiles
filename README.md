Source: [Le wagon Setup](https://github.com/lewagon/setup)

Run this shell:

```
export GITHUB_USERNAME=alexandrebk
```

Now copy/paste this very long line in your terminal. Do not change this one.

```
mkdir -p ~/code/$GITHUB_USERNAME && cd $_ && git clone git@github.com:$GITHUB_USERNAME/dotfiles.git
```

Run the `dotfiles` installer.

```
cd ~/code/$GITHUB_USERNAME/dotfiles
zsh install.sh
```

Then run the git installer: The programm will ask your email from Github.

```
cd ~/code/$GITHUB_USERNAME/dotfiles
zsh git_setup.sh
```

Please now quit all your opened terminal windows.

In order not to re-type your SSH passphrase at every git push, you can add these lines to the `~/.ssh/config` file:

```
touch ~/.ssh/config  # Creates the file if it does not exist
st ~/.ssh/config     # Opens the file in Sublime text
```

And then add these 3 lines to the file. Save.

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
```
