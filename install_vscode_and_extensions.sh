#!/bin/bash

echo "🔧 Installation de VS Code..."

# Installation VS Code pour Linux
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update && sudo apt install code -y

echo "📦 Installation des extensions VS Code..."

# Extensions basées sur vos settings.json
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-json
code --install-extension ms-vscode.vscode-docker
code --install-extension ms-vscode.remote-ssh
code --install-extension ms-vscode.remote-containers
code --install-extension hashicorp.terraform
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension redhat.vscode-yaml
code --install-extension ms-vscode.vscode-git-graph
code --install-extension eamodio.gitlens
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension ms-vscode.vscode-markdown
code --install-extension shd101wyy.markdown-preview-enhanced

echo "✅ VS Code et extensions installés avec succès !"
