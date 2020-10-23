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

---

### VIM

Plugin list

* [Vundle](https://github.com/VundleVim/Vundle.vim) ou [Vim Pathogen](https://github.com/tpope/vim-pathogen)
* [Vim Rails](https://github.com/tpope/vim-rails)
* [Surrounder](https://github.com/tpope/vim-surround)
* [Control P](https://github.com/ctrlpvim/ctrlp.vim)
* [Tabular](https://github.com/godlygeek/tabular)
* [Emmet](https://www.vim.org/scripts/script.php?script_id=2981)

First of all you need to install Vundle to manage your plugin.

The you can add the plugin to your `vimrc`

```
vim ~/.vimrc
```

At the end run

```
vim +PluginInstall +qall
```

To install Emmet vim you can follow [this instructions](https://vimawesome.com/plugin/emmet-vim)

---

### Brew

```
brew install rename
brew install tree
brew install ack
brew cask install whatsapp
```

---

### Un lien utile pour le setup de son mac

[Ici](https://sourabhbajaj.com/mac-setup/)

---

### Snippets

#### Vim

To install snippets on vim you can create symbolic link to your dotfiles

```
ln -s /Users/alexandrebouvier/code/alexandrebk/dotfiles/snippets/markdown_snippets.vim /Users/alexandrebouvier/.vim/after/ftplugin/markdown_snippets.vim
ln -s /Users/alexandrebouvier/code/alexandrebk/dotfiles/snippets/ruby_snippets.vim /Users/alexandrebouvier/.vim/after/ftplugin/ruby_snippets.vim
ln -s /Users/alexandrebouvier/code/alexandrebk/dotfiles/snippets/javascript_snippets.vim /Users/alexandrebouvier/.vim/after/ftplugin/javascript_snippets.vim
ln -s /Users/alexandrebouvier/code/alexandrebk/dotfiles/snippets/html_snippets.vim /Users/alexandrebouvier/.vim/after/ftplugin/html_snippets.vim
ln -s /Users/alexandrebouvier/code/alexandrebk/dotfiles/snippets/text_snippets.vim /Users/alexandrebouvier/.vim/after/ftplugin/text_snippets.vim
```

#### Sublime Test

```
subl /Users/alexandrebouvier/Library/Application\ Support/Sublime\ Text\ 3/Packages/User
```

---

### Photos saved on AWS S3

```sh
brew install rclone
```

1. Create a remote name `s3`
2. `rclone copy s3:my-new-space my/path/`
