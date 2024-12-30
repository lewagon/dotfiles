SHELL:=/bin/zsh

all: sudo xdg_specs brew ohmyzsh ohmyzsh_plugins stow asdf aws_credentials gpg_keys

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
# Skip if running in CI because Homebrew is already installed in macos-latest image
ifndef CI
	@echo "Installing Homebrew"
	/bin/bash -c "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	@echo "Done"
endif

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
	@/opt/homebrew/bin/stow --target=$(HOME) --dotfiles --verbose=1 --no-folding --adopt dot-files
	@echo "Done"

asdf: asdf-plugins asdf-nodejs asdf-python asdf-rust asdf-ruby

asdf-plugins:
	@echo "Adding asdf-alias plugin"
	@asdf plugin-add alias
	@asdf plugin-add nodejs
	@asdf plugin-add python
	@asdf plugin-add rust
	@asdf plugin-add ruby
	@echo "Done"

asdf-nodejs:
	@echo "Installing nodejs $$(asdf latest nodejs $$(asdf nodejs resolve lts --latest-available))"
	@asdf install nodejs $$(asdf latest nodejs $$(asdf nodejs resolve lts --latest-available))
	@asdf global nodejs $$(asdf latest nodejs $$(asdf nodejs resolve lts --latest-available))
	@echo "Done"

asdf-python:
	@echo "Installing python $$(asdf latest python) and 2.7.18"
	@asdf install python 2.7.18
	@asdf install python latest
	@asdf global python $$(asdf latest python) 2.7.18
	@echo "Done"

asdf-rust:
	@echo "Installing rust $$(asdf latest rust)"
	@asdf install rust latest
	@asdf global rust $$(asdf latest rust)
	@echo "Done"

asdf-ruby:
	@echo "Installing ruby $$(asdf latest ruby)"
	@asdf install ruby latest
	@asdf global ruby $$(asdf latest ruby)
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
	@mkdir -p $(GNUPGHOME)
	@chown -R $$(whoami) $(GNUPGHOME)
	@find $(GNUPGHOME) -type f -exec chmod 600 {} \;
	@find $(GNUPGHOME) -type d -exec chmod 700 {} \;
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

test-all: test-stow test-asdf-tools test-aws-credentials test-gpg

test-stow:
	@echo "Testing dotfiles"
	@test -L "$(XDG_CONFIG_HOME)/asdf/asdfrc"
	@test -L "$(XDG_CONFIG_HOME)/asdf/default-gems"
	@test -L "$(XDG_CONFIG_HOME)/aws/config"
	@test -L "$(XDG_CONFIG_HOME)/git/config"
	@test -L "$(XDG_CONFIG_HOME)/git/ignore"
	@test -L "$(XDG_CONFIG_HOME)/ngrok/ngrok.yml"
	@test -L "$(XDG_CONFIG_HOME)/zsh/.zshrc"
	@test -L "$(XDG_CONFIG_HOME)/zsh/.zlogin"
	@test -L "$(HOME)/.zshenv"
	@test -L "$(XDG_CONFIG_HOME)/zsh/ohmyzsh/custom/themes/robbyrussell-custom.zsh-theme"
	@echo "Done"

test-asdf-tools:
	@echo "Testing asdf tool versions"
	@[[ -f "$(HOME)/.tool-versions" && -n "$(HOME)/.tool-versions" ]]
	@echo "Done"

test-aws-credentials:
	@echo "Testing AWS credentials"
	@echo $(XDG_DATA_HOME)
	@cat "$(XDG_DATA_HOME)/aws/credentials"
	@[[ -f "$(XDG_DATA_HOME)/aws/credentials" && -n "$(XDG_DATA_HOME)/aws/credentials" ]]
	@echo "Done"

test-gpg:
	@echo "Testing GPG keys"
	@[[ -d "$(XDG_DATA_HOME)/gnupg" && -O "$(XDG_DATA_HOME)/gnupg" && -r "$(XDG_DATA_HOME)/gnupg" && -w "$(XDG_DATA_HOME)/gnupg" && -x "$(XDG_DATA_HOME)/gnupg" ]]
	@echo "Done"
