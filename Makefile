export XDG_CACHE_HOME = $(HOME)/.cache
export XDG_CONFIG_HOME = $(HOME)/.config
export XDG_DATA_HOME = $(HOME)/.local/share
export XDG_STATE_HOME = $(HOME)/.local/state
export XDG_DATA_DIRS = "/usr/local/share/:/usr/share/:/opt/homebrew/share"
export XDG_RUNTIME_DIR = "$(HOME)/.local/runtime"

all: sudo xdg_specs brew ohmyzsh ohmyzsh_plugins stow asdf aws_credentials_arqshoah aws_credentials_legado gpg_keys

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

brew:
	@echo "Installing Homebrew"
	@/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

	@echo "Installing Brew formulae"
	@/opt/homebrew/bin/brew bundle --no-lock --file=homebrew/Brewfile
	@echo "Done"

	@echo "Installing Brew casks"
	@/opt/homebrew/bin/brew bundle --no-lock --file=homebrew/Caskfile
	@echo "Done"

ohmyzsh:
	@echo "Installing Oh My Zsh"
	@sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
	@echo "Done"

ohmyzsh_plugins:
	@echo "Installing zsh-autosuggestions and zsh-syntax-highlighting plugins"
	@git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
	@git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
	@echo "Done"

stow:
	@echo "Installing dotfiles"
	@stow --target=$(HOME) --dotfiles --verbose=1 --no-folding --adopt dot-files
	@echo "Done"

asdf:
	@echo "Installing asdf plugins"
	@asdf plugin add alias
	@asdf plugin add nodejs
	@asdf plugin add python
	@asdf plugin add rust
	@asdf plugin add ruby

	@echo "Installing nodejs"
	@asdf install $$(asdf nodejs resolve lts --latest-available)
	@asdf global nodejs $$(asdf nodejs resolve lts --latest-available)

	@echo "Installing python"
	@asdf install python $$(asdf latest python)
	@asdf install python 2.7.18
	@asdf global python $$(asdf latest python) 2.7.18

	@echo "Installing rust"
	@asdf install rust $$(asdf latest rust)
	@asdf global rust $$(asdf latest rust)

	@echo "Installing ruby"
	@asdf install ruby $$(asdf latest ruby)
	@asdf global ruby $$(asdf latest ruby)
	@echo "Done"

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
	@chown -R $$(whoami) ~/.gnupg/
	@find ~/.gnupg -type f -exec chmod 600 {} \;
	@find ~/.gnupg -type d -exec chmod 700 {} \;
ifndef CI
	@gpg --import-options restore --import ~/.gnupg/jmschp_private.gpg
endif
	@echo "Done"

.PHONY: macos
macos:
	@echo "Configuring macOS"
	@./macos.sh
	@echo "Done"
