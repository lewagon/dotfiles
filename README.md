# Dotfiles

[![Test dotfiles](https://github.com/jmschp/dotfiles/actions/workflows/github-actions.yml/badge.svg)](https://github.com/jmschp/dotfiles/actions/workflows/github-actions.yml)

## Installation

### MacOS configuration System update

On a new installation of macOS open the terminal and run `softwareupdate -i -a` to update macOS:

After updating macOS, usually its necessary to restart. Then run `xcode-select --install` to update macos CLI tools:

### Clone the repo

```zsh
git clone https://github.com/jmschp/dotfiles.git ~/code/dotfiles && cd ~/code/dotfiles
```

### Run the Make file

Run the `Makefile` with `make` to start the installation.

### Setup macOS configuration

Run `make macos` to setup all the configs for macOS.

---

I have made some personal customizations, based on Lars Kappert and Mathias Bynens dotfiles. Thank you, for you awesome dotfiles repo.

- [Lars Kappert](https://github.com/webpro/dotfiles)
- [Mathias Bynens](https://github.com/mathiasbynens/dotfiles)
