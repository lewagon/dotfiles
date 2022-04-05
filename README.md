# Dotfiles

This repository was forked from from [Le Wagon Dotfiles](https://github.com/lewagon/dotfiles), and is used by [Le Wagon](https://www.lewagon.com) students during our 9-week coding bootcamp.

I have made some personal customizations, based on Lars Kappert and Mathias Bynens dotfiles. Thank you, for you awesome dotfiles repo.

- [Lars Kappert](https://github.com/webpro/dotfiles)
- [Mathias Bynens](https://github.com/mathiasbynens/dotfiles)

At the moment I am using: **MacBook Pro (13-inch, M1, 2020), macOS Monterey 12.3.1**

First clone the repository with:

```sh
git clone https://github.com/jmschp/dotfiles.git ~/code/dotfiles
```

## Installation

### MacOS configuration System update

On a new installation of macOS open the terminal and run `softwareupdate -i -a` to update macOS:

```sh
softwareupdate -i -a
```

After updating macOS, usually its necessary to restart. Then run `xcode-select --install` to update macos CLI tools:

```sh
xcode-select --install
```

### MacOS configuration apply system preferences

Run the `11_macos.sh` that is in the folder `10_macos`:

```sh
source 10_macos/11_macos.sh
```

### Homebrew toolset

Run `21_homebrew.sh` in the `20_homebrew` folder this will install [Homebrew](https://brew.sh/), followed by the installation of all the packages listed in the Brewfile.

```sh
source 20_homebrew/21_homebrew.sh
```

#### Oh My Zsh setup

Run `oh-my-zsh.sh` to install Oh My Zsh with theme Powerlevel10k, and some plugins.

[Zsh](https://www.zsh.org/)

- Theme:
  - [Powerlevel10k](https://github.com/romkatv/powerlevel10k) theme
- External plugins:
  - [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
  - [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search)
  - [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)

```sh
source 30_oh-my-zsh/oh-my-zsh.sh
```

#### Mackup

Run `40_mackup.sh` to restore config files. First it will symlink the `mackup.cfg` to the home directory, and them it will restore config files.

```sh
source 40_mackup/40_mackup.sh
```
