#!/bin/zsh

# echo "Making zsh your defual shell"
# To set zsh as your default shell
# chsh -s /bin/zsh
# echo "Done"

echo "Installing Oh My Zsh"
# To install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
echo "Done"

echo "Downloading fonts for Powerlevel10k"
# Download and install the fonts need for Powerlevel10K terminal theme
cd ~/Library/Fonts && { curl -L 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf' -o 'MesloLGS NF Regular.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -L 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf' -o 'MesloLGS NF Bold.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -L 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf' -o 'MesloLGS NF Italic.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -L 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf' -o 'MesloLGS NF Bold Italic.ttf' ; cd -; }
echo "Done"

echo "Installing Powerlevel10k theme"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
echo "Done"

echo "Installing zsh-users plugins"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
echo "Done"

echo "Please restart the terminal and folllow the Powerlevel10k configuration wizard or use your on config file"
exit
