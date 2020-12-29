function install_or_upgrade {
    if brew list --formula | grep -q $1;
        then brew upgrade $1;
    else brew install $1; fi
    }

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Brew packages
brew bundle