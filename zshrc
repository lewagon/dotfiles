ZSH=$HOME/.oh-my-zsh

# You can change the theme with another one:
#   https://github.com/robbyrussell/oh-my-zsh/wiki/themes
ZSH_THEME="robbyrussell"

# Useful plugins for Rails development with Sublime Text
plugins=(git gitfast last-working-dir common-aliases sublime zsh-syntax-highlighting history-substring-search)

# Prevent Homebrew from reporting - https://github.com/Homebrew/brew/blob/master/share/doc/homebrew/Analytics.md
export HOMEBREW_NO_ANALYTICS=1

# Actually load Oh-My-Zsh
source "${ZSH}/oh-my-zsh.sh"
unalias rm # No interactive rm by default (brought by plugins/common-aliases)

# Load rbenv if installed
export PATH="${HOME}/.rbenv/bin:${PATH}"
type -a rbenv > /dev/null && eval "$(rbenv init -)"

# Rails and Ruby uses the local `bin` folder to store binstubs.
# So instead of running `bin/rails` like the doc says, just run `rails`
# Same for `./node_modules/.bin` and nodejs
export PATH="./bin:./node_modules/.bin:${PATH}:/usr/local/sbin"

# Store your own aliases in the ~/.aliases file and load the here.
[[ -f "$HOME/.aliases" ]] && source "$HOME/.aliases"

# Encoding stuff for the terminal
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export BUNDLER_EDITOR="subl $@ >/dev/null 2>&1 -a"
export BUNDLER_EDITOR="subl $@ >/dev/null 2>&1 -a"
export BUNDLER_EDITOR="subl $@ >/dev/null 2>&1 -a"

export PATH="$PATH:/home/alexandre/flutter/bin"
export PATH="$PATH:/home/alexandre/Android/Sdk/tools/bin"
export PATH="$PATH:/home/alexandre/Android/Sdk/build-tools/29.0.2"
export PATH="$PATH:/home/alexandre/Android/Sdk/platform-tools"
export PATH="$PATH:/home/alexandre/Android/Sdk/emulator"
export PATH="$PATH:/usr/lib/jvm/jdk-13.0.2/bin"
export PATH="$PATH://home/alexandre/Maven/apache-maven-3.6.3-bin/apache-maven-3.6.3/bin"

export GRADLE_HOME=/opt/gradle/gradle-6.1.1
export PATH=${GRADLE_HOME}/bin:${PATH}



export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
