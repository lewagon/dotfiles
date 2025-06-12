# 📋 Configuration nouvel environnement

## 🔧 1. Outils de base
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git curl build-essential zsh autojump fzf tilix tree htop -y
chsh -s $(which zsh)

# Oh My Zsh + Powerlevel10k
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

## 📁 2. Configuration SSH
```bash
# Créer dossier SSH avec bonnes permissions
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# COPIER MANUELLEMENT vos clés privées :
# - Récupérer ma clé privée
# - Sur la nouvelle machine : la coller dans le dossier .ssh
# - chmod 600 ~/.ssh/id_[ma_clé_privée]
# - chmod 644 ~/.ssh/id_[ma_clé_publique].pub
```

## 🔗 3. Dotfiles
```bash
git clone git@github.com:GautierDeMo/dotfiles.git ~/dotfiles
cd ~/dotfiles
chmod +x install.sh git_setup.sh
./install.sh  # Gère automatiquement SSH config et P10k
./git_setup.sh
```

## 🖥️ 4. VS Code + Extensions
```bash
chmod +x install_vscode_and_extensions.sh
./install_vscode_and_extensions.sh
```

## 🐍 5. Environnements dev
```bash
# PHP + Composer
sudo apt install php php-cli php-mbstring php-xml php-curl php-zip unzip -y
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version

# rbenv pour Ruby
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
curl https://pyenv.run | bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Docker
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
echo "⚠️  LOGOUT/LOGIN requis pour permissions Docker"
```

## 🎨 6. Polices et finalisation
```bash
# Installation des polices Nerd Fonts (nécessaires pour Powerlevel10k)
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Meslo.zip
unzip Meslo.zip -d ~/.local/share/fonts/
fc-cache -fv

# PhpStorm (alias 'pst' dans votre zshrc)
sudo snap install phpstorm --classic

## ✅ 7. Vérifications
```bash
# Test des commandes
which git && echo "✅ Git OK"
which code && echo "✅ VS Code OK"
which docker && echo "✅ Docker OK"
which node && echo "✅ Node OK"
which python3 && echo "✅ Python OK"
which ruby && echo "✅ Ruby OK"
which zsh && echo "✅ zsh OK"
which php && echo "✅ php OK"

# Test des aliases
alias | grep pst && echo "✅ Aliases OK"

# Test des dotfiles
ls -la ~ | grep "dotfiles" && echo "✅ Dotfiles symlinks OK"

# Test plugins zsh
echo $plugins && echo "✅ Plugins chargés"

# Test connexion GitHub
ssh -T git@github.com

# Redémarrage final
exec zsh
```
