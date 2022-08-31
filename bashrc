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
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
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

# enable z script
. ~/.z.sh

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
  if type -p __git_ps1; then
    local git_branch=$(__git_ps1 | tr -d '()')
  else
    local git_branch=$(git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/')
  fi

  # Basic command prompt to use when not in a git repo directory.
  PS1="\n\u@\h:\[\e[1;36m\]\w\[\e[0m\]"

  if [ -n "$git_branch" ] && [ -n "$(which perl)" ] ; then
    local proj_dir=$(pwd | sed 's/.*\/proj\///')
    local proj_top_dir=$(echo $proj_dir | sed 's/\/.*//')
    local proj_subdir=$(echo $proj_dir | perl -pe 's|.+?/||')
    # TODO: Call 'git status' only once.
    #local untracked_files=$(git ls-files --other --exclude-standard 2> /dev/null  | wc -l)
    local untracked_files=$(git status . --porcelain 2> /dev/null | grep -Ec '^ ?\?\? ' 2> /dev/null)
    local added_files=$(git status . --porcelain 2> /dev/null | grep -Ec '^ ?A ' 2> /dev/null)
    local modified_files=$(git status . --porcelain 2> /dev/null | grep -Ec '^ ?M ' 2> /dev/null)
    local deleted_files=$(git status . --porcelain 2> /dev/null | grep -Ec '^ ?D ' 2> /dev/null)
    local renamed_files=$(git status . --porcelain 2> /dev/null | grep -Ec '^ ?R ' 2> /dev/null)

    # Delimiter to distinguish from other output.
    # PS1="________________________________________________________________________________"

    # Git user.name <user.email>
    # PS1="${PS1}\n\[\e[1;38m\]$(git config user.name) <$(git config user.email)>\[\e[0m\]"
    
    # Project dir (assumes you have all your git repos in a proj dir.
    # PS1="[\e[1;35m\]${proj_top_dir}\[\e[0m\]"
    # if [ "${proj_top_dir}" != "${proj_subdir}" ]; then
    #   PS1="${PS1}\[\e[1;36m\]/${proj_subdir}\[\e[0m\]"
    # fi

    # Untracked files
    if [ $untracked_files -gt 0 ]; then
        PS1="${PS1} ?\[\e[1;39m\]${untracked_files}\[\e[0m\]"
    fi

    # Added files
    if [ $added_files -gt 0 ]; then
        PS1="${PS1} +\[\e[1;32m\]${added_files}\[\e[0m\]"
    fi

    # Modified files
    if [ $modified_files -gt 0 ]; then
      PS1="${PS1} *\[\e[1;34m\]${modified_files}\[\e[0m\]"
    fi

    # Renamed files
    if [ $renamed_files -gt 0 ]; then
      PS1="${PS1} ^\[\e[1;36m\]${renamed_files}\[\e[0m\]"
    fi

    # Deleted files
    if [ $deleted_files -gt 0 ]; then
      PS1="${PS1} -\[\e[1;31m\]${deleted_files}\[\e[0m\]"
    fi

    # Branch
    branch_dirname=$(dirname $git_branch)
    if [ $branch_dirname = "." ]; then
        branch_dirname=
    else
        branch_dirname=${branch_dirname}/
    fi
    PS1="${PS1} ${branch_dirname}\[\e[1;33m\]$(basename ${git_branch})\[\e[0m\]"


  fi

  # Just the command prompt character(s) and pyenv virtualenv
  python_version=$(python --version | awk '{print $2}')
  pyenv_name="$(pyenv version-name) ${python_version}"
  PS1="${PS1}\n\[\e[1;32m\](${pyenv_name}) ->\[\e[0m\] "
}

PROMPT_COMMAND=my_prompt_command


[ -f ~/.fzf.bash ] && source ~/.fzf.bash

# Update PATH for the Google Cloud SDK.
if [ -f '/home/xavierosee/google-cloud-sdk/path.bash.inc' ]; then . '/home/xavierosee/google-cloud-sdk/path.bash.inc'; fi

# Enable shell command completion for gcloud.
if [ -f '/home/xavierosee/google-cloud-sdk/completion.bash.inc' ]; then . '/home/xavierosee/google-cloud-sdk/completion.bash.inc'; fi

# Enable shell command completion for dbt
[ -f ~/.dbt-completion.bash ] && source ~/.dbt-completion.bash
