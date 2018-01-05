ZSH=$HOME/.oh-my-zsh

# Correct number of colors for iTerm
export TERM="xterm-256color"

kubeon-prompt() {
    if [ "${KUBEON_PROMPT}" ]; then
        echo -n ${KUBEON_THEME_PROMPT_PREFIX}${KUBEON_PROMPT}${KUBEON_THEME_PROMPT_SUFFIX}
    fi
}

function podname { kubectl get pods | grep $1  | awk '{print $1}'; }

ZSH_THEME="powerlevel9k/powerlevel9k"

RPS1="${kubeon-prompt}"

# Useful plugins for Rails development with Sublime Text
plugins=(gitfast brew rbenv last-working-dir common-aliases sublime zsh-syntax-highlighting history-substring-search kubectl) 

# Actually load Oh-My-Zsh
source "${ZSH}/oh-my-zsh.sh"

# Rails and Ruby uses the local `bin` folder to store binstubs.
# So instead of running `bin/rails` like the doc says, just run `rails`
export PATH="./bin:${PATH}"

# Store your own aliases in the ~/.aliases file and load them here.
[[ -f "$HOME/.aliases" ]] && source "$HOME/.aliases"

# Shell integration on login
source ~/.iterm2_shell_integration.`basename $SHELL`

# Encoding stuff for the terminal
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export BUNDLER_EDITOR="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"
export PATH="/usr/local/sbin:$PATH"

export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3.5
source /usr/local/bin/virtualenvwrapper.sh

export PATH=/usr/local/bin:$PATH

test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

export TWYLA_XPI_CONF=/Users/nathankuik/code/twyla/xpi/config/local.yml
export TWYLA_CLIENTAPP_CONF=/Users/nathankuik/code/twyla/clientapp/config/local.yml

function kubeon {
    if [ "${1}" ]; then
        local config_file="${1}"
    else
        echo "Usage: kubeon <config|config_file>"
        return 1
    fi

    if [ ! -f "${1}" ]; then
        config_file="${HOME}/.kube/${1}-config"
    fi

    if [ ! -f "${config_file}" ]; then
        echo "No config file found. Tried ${1} and ${config_file}"
        return 1
    fi

    export KUBECONFIG="${HOME}/.kube/${1}-config"
    export KUBEON_PROMPT="${1}"
}

function kubeoff {
    unset KUBECONFIG
    unset KUBEON_PROMPT
}
export PATH="/usr/local/bin:/usr/local/sbin:./bin:/Users/nathankuik/.rbenv/shims:/usr/local/opt/rbenv/bin:/Users/nathankuik/.cargo/bin:/usr/local/bin:/Library/Frameworks/Python.framework/Versions/3.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/share/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
