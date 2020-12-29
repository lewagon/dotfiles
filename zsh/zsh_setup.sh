echo "Making zsh your defual shell"
# To set zsh as your default shell
chsh -s /bin/zsh
echo "Done"

echo "Installing Oh My Zsh"
# To install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
echo "Done"

echo "Downloading fonts for Powerlevel10k"
# Download and install the fonts need for Powerlevel10K terminal theme
cd ~/Library/Fonts && { curl -O 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -O 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -O 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf' ; cd -; }
cd ~/Library/Fonts && { curl -O 'https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf' ; cd -; }
echo "Done"
echo "Please restart the terminal and folllow the Powerlevel10k configuration wizard"