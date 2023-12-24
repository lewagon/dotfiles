# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000000
HISTFILESIZE=100000000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=no;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\035[01;32m\]\u@\h\[\035[00m\]:\[\035[01;34m\]\w\[\035[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias dir='dir --color=auto'
    alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# alias definitions
if [ -f ~/.aliases ]; then
    . ~/.aliases
fi

if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [[ -z "$TMUX" ]]; then
   ta 
fi

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'


# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

# change default theme for bat (cat replacement)
export BAT_THEME="GitHub"

# update PATH so it includes pyenv
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"


# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# Create a command prompt with useful git information.
#
# Adds, Mods, Deletes etc are displayed from the current dir down
# (IE 'git status .' vs 'git status')
#

function my_prompt_command {
  # Determine the current git branch, if any.
  if type -p __git_ps1 &> /dev/null; then
    local git_branch=$(__git_ps1 | tr -d '()')
  else
    local git_branch=$(git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/')
  fi

  # Set the basic command prompt.
  PS1="\n\u@\h:\[\e[1;36m\]\w\[\e[0m\]"

  if [ -n "$git_branch" ]; then
    # Gather git status information.
    local git_status=$(git status . --porcelain 2> /dev/null)

    # Calculate file statuses.
    local untracked_files=$(echo "$git_status" | awk '/^\?\?/{count++} END {print count+0}')
    local added_files=$(echo "$git_status" | awk '/^A/{count++} END {print count+0}')
    local modified_files=$(echo "$git_status" | awk '/^M/{count++} END {print count+0}')
    local deleted_files=$(echo "$git_status" | awk '/^D/{count++} END {print count+0}')
    local renamed_files=$(echo "$git_status" | awk '/^R/{count++} END {print count+0}')

    # Append file status information to the prompt.
    [[ $untracked_files -gt 0 ]] && PS1="${PS1} ?\[\e[1;39m\]${untracked_files}\[\e[0m\]"
    [[ $added_files -gt 0 ]] && PS1="${PS1} +\[\e[1;32m\]${added_files}\[\e[0m\]"
    [[ $modified_files -gt 0 ]] && PS1="${PS1} *\[\e[1;34m\]${modified_files}\[\e[0m\]"
    [[ $renamed_files -gt 0 ]] && PS1="${PS1} ^\[\e[1;36m\]${renamed_files}\[\e[0m\]"
    [[ $deleted_files -gt 0 ]] && PS1="${PS1} -\[\e[1;31m\]${deleted_files}\[\e[0m\]"

    # Append git branch information to the prompt.
    local branch_name=$(basename "$git_branch")
    [[ -n "$branch_name" ]] && PS1="${PS1} \[\e[0;35m\]${branch_name}\[\e[0m\]"
  fi

  # Append Python environment information.
  local python_version=$(python --version 2>&1 | awk '{print $2}')
  local pyenv_name="$(pyenv version-name 2> /dev/null) ${python_version}"
  PS1="${PS1}\n\[\e[1;32m\](${pyenv_name}) ->\[\e[0m\] "
}

# Assign the function to PROMPT_COMMAND.
PROMPT_COMMAND=my_prompt_command


[ -f ~/.fzf.bash ] && source ~/.fzf.bash

# Update PATH for the Google Cloud SDK.
if [ -f '/home/xavierosee/.google-cloud-sdk/path.bash.inc' ]; then . '/home/xavierosee/.google-cloud-sdk/path.bash.inc'; fi

# Enable shell command completion for gcloud.
if [ -f '/home/xavierosee/.google-cloud-sdk/completion.bash.inc' ]; then . '/home/xavierosee/.google-cloud-sdk/completion.bash.inc'; fi

# Enable shell command completion for dbt
[ -f ~/.dbt-completion.bash ] && source ~/.dbt-completion.bash

# Enable shell command completion for git
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi

# Enable PATH for Flutter
if [ -d "$HOME/workspace/xavierosee/flutter/bin" ] ; then
    PATH="$HOME/workspace/xavierosee/flutter/bin:$PATH"
fi
export ANDROID_HOME=$HOME/Library/Android/sdk

# Enable Terraform autocompletion
complete -o nospace -C /usr/local/bin/terraform terraform

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
