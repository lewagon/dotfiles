PROMPT="%(?:%{$fg_bold[green]%}%1{➜%} :%{$fg_bold[red]%}%1{➜%} ) %{$fg[cyan]%}%c%{$reset_color%}"
PROMPT+='$(git_prompt_info)$(git_prompt_status)$(git_remote_status) '

# [[ ! -z ${git_info} ]] && echo "%{$fg_bold[magenta]%})%{$reset_color%}" || echo ""

# git_prompt_info
ZSH_THEME_GIT_PROMPT_PREFIX=" %{$fg_bold[magenta]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_DIRTY=" %{$fg[yellow]%}%1{✘%}"
ZSH_THEME_GIT_PROMPT_CLEAN=" %{$fg[green]%}%1{✔%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$fg_bold[magenta]%})%{$reset_color%}"

# git_prompt_status
ZSH_THEME_GIT_PROMPT_ADDED="%{$fg_bold[green]%}+%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DELETED="%{$fg_bold[red]%}%1{✕%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$fg_bold[yellow]%}%1{✎%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$fg_bold[yellow]%}%1{➜%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_STASHED="%{$fg_bold[cyan]%}%1{⚑%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$fg_bold[red]%}%1{!%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg_bold[yellow]%}%1{?%}%{$reset_color%}"

# git_remote_status
ZSH_THEME_GIT_PROMPT_AHEAD_REMOTE="$commits_ahead%{$fg_bold[red]%}%1{⬆%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_BEHIND_REMOTE="$commits_behind%{$fg_bold[cyan]%}%1{⬇%}%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIVERGED_REMOTE="%{$fg_bold[yellow]%}%1{⇆%}%{$reset_color%}"

# 'ADDED'     "$ZSH_THEME_GIT_PROMPT_ADDED"
# 'MODIFIED'  "$ZSH_THEME_GIT_PROMPT_MODIFIED"
# 'STASHED'   "$ZSH_THEME_GIT_PROMPT_STASHED"
# 'UNTRACKED' "$ZSH_THEME_GIT_PROMPT_UNTRACKED"
# 'RENAMED'   "$ZSH_THEME_GIT_PROMPT_RENAMED"
# 'DELETED'   "$ZSH_THEME_GIT_PROMPT_DELETED"
# 'UNMERGED'  "$ZSH_THEME_GIT_PROMPT_UNMERGED"


# 'AHEAD'     "$ZSH_THEME_GIT_PROMPT_AHEAD"
# 'BEHIND'    "$ZSH_THEME_GIT_PROMPT_BEHIND"
# 'DIVERGED'  "$ZSH_THEME_GIT_PROMPT_DIVERGED"

# Ruby prompt
# function asdf_ruby_prompt_info() {
#   local ruby=$(asdf current ruby)
#   ZSH_THEME_RUBY_PROMPT_PREFIX="%{$fg_bold[red]%}%1{◆%}%{$reset_color%}ruby:"
#   ZSH_THEME_RUBY_PROMPT_SUFFIX="${ruby[(w)2]}"
#   echo "${ZSH_THEME_RUBY_PROMPT_PREFIX}${ZSH_THEME_RUBY_PROMPT_SUFFIX}"
# }

# function asdf_nodejs_prompt_info() {
#   local nodejs=$(asdf current nodejs)
#   ZSH_THEME_NVM_PROMPT_PREFIX="%{$fg_bold[green]%}%1{⬢%}%{$reset_color%}nodejs:"
#   ZSH_THEME_NVM_PROMPT_SUFFIX="${nodejs[(w)2]}"
#   echo "${ZSH_THEME_NVM_PROMPT_PREFIX}${nvm_prompt:gs/%/%%}${ZSH_THEME_NVM_PROMPT_SUFFIX}"
# }

# RPROMPT+='$(asdf_ruby_prompt_info) $(asdf_nodejs_prompt_info)'
