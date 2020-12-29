###### work in progress
# Dotfiles
This repositry was forked from from [Le Wagon Dotfiles](https://github.com/lewagon/dotfiles), and is used by [Le Wagon](https://www.lewagon.com) students during our 9-week [coding bootcamp](https://www.lewagon.com).

I have made some personal customizations, based on:
Lars Kappert and Mathias Bynens dotfiles.
Thank you, for you awesome dotfiles repo.
- https://github.com/webpro/dotfiles
- https://github.com/mathiasbynens/dotfiles

At the moment I am usign:
>Macbook Pro 15 2011 with macOS High Sierra 10.13

## Installation
### MacOS configuration
#### Sytem update
On a new installation of macOS open the terminal and run:
```bash
sudo softwareupdate -i -a
```
To update macOS. After running sudo `softwareupdate -i -a` it might be necesary to restart the system. Then run:
```bash
xcode-select --install
```
#### Apply system preferences
Run the `defaults.sh ` and `defaults-chrome` that is in the folder `macos`
```bash
bash macos/defaults.sh
bash macos/defaults-chrome.sh
```
### Homebrew toolset
Run `brew.sh ` in the `brew` folder this will install [Homebrew](https://brew.sh/), followed by the instalation of all the  packages listed in the Brewfile.
```bash
bash brew/brew.sh
```
#### zsh setup
Homebrew as already installed
- [Zsh](https://www.zsh.org/)
- [Powerlevel10k](https://github.com/romkatv/powerlevel10k) theme
- [Zsh Syntax Highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) plugin

Run the `zsh_setup.sh` file in the `zsh` folder to setup Zsh
```bash
bash zsh/zsh_setup.sh
```
This will make:
1. zsh your defual shell
2. Download [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)
3. Downloading fonts for Powerlevel10k theme