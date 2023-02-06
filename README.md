# Dotfiles

This repository was forked from from [Le Wagon Dotfiles](https://github.com/lewagon/dotfiles), and is used by [Le Wagon](https://www.lewagon.com) students during our 9-week coding bootcamp.

I have made some personal customizations, based on Lars Kappert and Mathias Bynens dotfiles. Thank you, for you awesome dotfiles repo.

- [Lars Kappert](https://github.com/webpro/dotfiles)
- [Mathias Bynens](https://github.com/mathiasbynens/dotfiles)

At the moment I am using: **MacBook Pro (14-inch, M1, 2021), macOS Ventura**

First clone the repository with:

```sh
git clone https://github.com/jmschp/dotfiles.git ~/code/dotfiles
```

## Installation

### Prepare installation

This creates `~/.config/`, and sets XDG_CONFIG_HOME to it. It creates if it does not exist the `~/.zshenv`, which in the end will be replaced by the [Mackup](https://github.com/lra/mackup) version.

```sh
source prepare.sh
```

### 1. MacOS configuration System update

On a new installation of macOS open the terminal and run `softwareupdate -i -a` to update macOS:

```sh
softwareupdate -i -a
```

After updating macOS, usually its necessary to restart. Then run `xcode-select --install` to update macos CLI tools:

```sh
xcode-select --install
```

#### MacOS configuration apply system preferences

Run the `11_macos.sh` that is in the folder `10_macos`. This script will restart the machine.

```sh
source 10_macos/macos.sh
```

### 2. Homebrew

Run `21_homebrew.sh` in the `20_homebrew` folder this will install [Homebrew](https://brew.sh/), followed by the installation of all the packages listed in the [Brewfile](./20_homebrew/Brewfile).

```sh
source 20_homebrew/homebrew.sh
```

### 3. [Oh My Zsh](https://ohmyz.sh/)

Run `oh-my-zsh.sh` to install [Oh My Zsh](https://ohmyz.sh/) with theme Powerlevel10k, and some plugins.

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

### 4. [Mackup](https://github.com/lra/mackup)

Run `40_mackup.sh` to restore config files. First it will symlink the `mackup.cfg` to the home directory, and them it will restore config files.

```sh
source 40_mackup/mackup.sh
```

### 5. [asdf](https://asdf-vm.com/)

Run `asdf.sh` to add Ruby and Node.js [asdf](https://asdf-vm.com/) plugins and install the versions specified in `$HOME/.tool-versions`.

```sh
source 50_asdf/asdf.sh
```
