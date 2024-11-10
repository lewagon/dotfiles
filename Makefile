export XDG_CACHE_HOME = $(HOME)/.cache
export XDG_CONFIG_HOME = $(HOME)/.config
export XDG_DATA_HOME = $(HOME)/.local/share
export XDG_STATE_HOME = $(HOME)/.local/state
export XDG_DATA_DIRS = "/usr/local/share/:/usr/share/:/opt/homebrew/share"
export XDG_RUNTIME_DIR = "$(HOME)/.local/runtime"

all: sudo xdg_specs brew ohmyzsh ohmyzsh_plugins stow asdf-plugins asdf aws_credentials gpg_keys

sudo:
ifndef CI
	sudo -v
	while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &
endif

xdg_specs:
	@echo "Creating XDG Base Directory Specification"
	@mkdir -p "$(HOME)/.cache"
	@mkdir -p "$(HOME)/.config"
	@mkdir -p "$(HOME)/.local/share"
	@mkdir -p "$(HOME)/.local/state"
	@mkdir -p "$(HOME)/.local/runtime"
	@chmod 0700 "$(HOME)/.local/runtime"
	@echo "Done"

brew: brew-install brew-formulae brew-casks

brew-install:
	@echo "Installing Homebrew"
	@/bin/bash -c "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	@echo "Done"

brew-formulae:
	@echo "Installing Brew formulae"
	@/opt/homebrew/bin/brew bundle --no-lock --file=homebrew/Brewfile
	@echo "Done"

brew-casks:
ifndef CI
	@echo "Installing Brew casks"
	@/opt/homebrew/bin/brew bundle --no-lock --file=homebrew/Caskfile
	@echo "Done"
endif

ohmyzsh:
	@echo "Installing Oh My Zsh"
	@sh -c "$$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
	@echo "Done"

ohmyzsh_plugins:
	@echo "Installing zsh-autosuggestions and zsh-syntax-highlighting plugins"
	@git clone https://github.com/zsh-users/zsh-autosuggestions $${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
	@git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
	@echo "Done"

stow:
	@echo "Installing dotfiles"
	@stow --target=$(HOME) --dotfiles --verbose=1 --no-folding --adopt dot-files
	@echo "Done"

asdf: asdf-plugins asdf-nodejs asdf-python asdf-rust asdf-ruby

asdf-plugins:
	@echo "Adding asdf-alias plugin"
	@/opt/homebrew/opt/asdf/libexec/bin/asdf plugin-add alias
	@/opt/homebrew/opt/asdf/libexec/bin/asdf plugin-add nodejs
	@/opt/homebrew/opt/asdf/libexec/bin/asdf plugin-add python
	@/opt/homebrew/opt/asdf/libexec/bin/asdf plugin-add rust
	@/opt/homebrew/opt/asdf/libexec/bin/asdf plugin-add ruby
	@echo "Done"

asdf-nodejs:
	@echo "Installing nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf nodejs resolve lts --latest-available))"
	@/opt/homebrew/opt/asdf/libexec/bin/asdf install nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf nodejs resolve lts --latest-available))
	@/opt/homebrew/opt/asdf/libexec/bin/asdf global nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest nodejs $$(/opt/homebrew/opt/asdf/libexec/bin/asdf nodejs resolve lts --latest-available))
	@echo "Done"

asdf-python:
	@echo "Installing python $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest python) and 2.7.18"
	@/opt/homebrew/opt/asdf/libexec/bin/asdf install python 2.7.18
	@/opt/homebrew/opt/asdf/libexec/bin/asdf install python $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest python)
	@/opt/homebrew/opt/asdf/libexec/bin/asdf global python $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest python) 2.7.18
	@echo "Done"

asdf-rust:
	@echo "Installing rust $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest rust)"
	@/opt/homebrew/opt/asdf/libexec/bin/asdf install rust $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest rust)
	@/opt/homebrew/opt/asdf/libexec/bin/asdf global rust $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest rust)
	@echo "Done"

asdf-ruby:
	@echo "Installing ruby $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest ruby)"
	@/opt/homebrew/opt/asdf/libexec/bin/asdf install ruby $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest ruby)
	@/opt/homebrew/opt/asdf/libexec/bin/asdf global ruby $$(/opt/homebrew/opt/asdf/libexec/bin/asdf latest ruby)
	@echo "Done"

aws_credentials: aws_credentials_arqshoah aws_credentials_legado

aws_credentials_arqshoah:
	@echo "Configuring AWS credentials for Arqshoah"
	@[[ -n $$aws_access_key_id ]] || read -rp "Enter AWS Access Key ID for Arqshoah: " aws_access_key_id; \
	/opt/homebrew/bin/aws configure set aws_access_key_id $$aws_access_key_id --profile arqshoah;

	@[[ -n $$aws_secret_access_key ]] || read -rp "Enter AWS Secret Access Key for Arqshoah: " aws_secret_access_key; \
	/opt/homebrew/bin/aws configure set aws_secret_access_key $$aws_secret_access_key --profile arqshoah
	@echo "Done"

aws_credentials_legado:
	@echo "Configuring AWS credentials for Legado"
	@[[ -n $$aws_access_key_id ]] || read -rp "Enter AWS Access Key ID for Legado: " aws_access_key_id; \
	/opt/homebrew/bin/aws configure set aws_access_key_id $$aws_access_key_id --profile legado;

	@[[ -n $$aws_secret_access_key ]] || read -rp "Enter AWS Secret Access Key for Legado: " aws_secret_access_key; \
	/opt/homebrew/bin/aws configure set aws_secret_access_key $$aws_secret_access_key --profile legado;
	@echo "Done"

gpg_keys:
	@echo "Setup GPG keys"
	@mkdir -p ~/.gnupg
	@chown -R $$(whoami) ~/.gnupg/
	@find ~/.gnupg -type f -exec chmod 600 {} \;
	@find ~/.gnupg -type d -exec chmod 700 {} \;
ifndef CI
	@read -rp "Enter path to GPG key backup: " path_to_gpg_key; \
	/opt/homebrew/bin/gpg --import-options restore --import $$path_to_gpg_key
endif
	@echo "Done"

.PHONY: macos
macos:
	@echo "Configuring macOS"
	@./macos.sh
	@echo "Done"

# Tests

test-all: test-xdg_specs test-stow test-asdf-tools test-aws-credentials test-gpg

test-xdg_specs:
	@echo "Testing XDG Base Directory Specification"
	@test -d "$(HOME)/.cache"
	@test -d "$(HOME)/.config"
	@test -d "$(HOME)/.local/share"
	@test -d "$(HOME)/.local/state"
	@test -d "$(HOME)/.local/runtime"
	@test -d "$(HOME)/.local/runtime"
	@echo "Done"

test-stow:
	@echo "Testing dotfiles"
	@test -h "$(XDG_CONFIG_HOME)/asdf/asdfrc"
	@test -h "$(XDG_CONFIG_HOME)/asdf/default-gems"
	@test -h "$(XDG_CONFIG_HOME)/aws/config"
	@test -h "$(XDG_CONFIG_HOME)/git/config"
	@test -h "$(XDG_CONFIG_HOME)/git/ignore"
	@test -h "$(XDG_CONFIG_HOME)/ngrok/ngrok.yml"
	@test -h "$(XDG_CONFIG_HOME)/zsh/.zshrc"
	@test -h "$(XDG_CONFIG_HOME)/zsh/.zlogin"
	@test -h "$(HOME)/.zshenv"
	@test -h "$(HOME)/.oh-my-zsh/custom/themes/robbyrussell-custom.zsh-theme"
	@echo "Done"

test-asdf-tools:
	@echo "Testing asdf tool versions"
	@[[ -f "$(HOME)/.tool-versions" && -n "$(HOME)/.tool-versions" ]]
	@echo "Done"

test-aws-credentials:
	@echo "Testing AWS credentials"
	@[[ -f "$(XDG_DATA_HOME)/aws/credentials" && -n "$(XDG_DATA_HOME)/aws/credentials" ]]
	@echo "Done"

test-gpg:
	@echo "Testing GPG keys"
	@[[ -d "$(HOME)/.gnupg" && -O "$(HOME)/.gnupg" && -r "$(HOME)/.gnupg" && -w "$(HOME)/.gnupg" && -x "$(HOME)/.gnupg" ]]
	@echo "Done"
