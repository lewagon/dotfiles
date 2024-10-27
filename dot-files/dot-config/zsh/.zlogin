###### Complete hidden paths
# setopt globdots

###### Alias
alias aliasg='alias | grep'
alias gsweep='git branch --merged $(git_main_branch) | grep -v "$(git_main_branch)$" | xargs git branch -d && git remote prune origin'
alias myip="curl https://ipinfo.io/json" # or /ip for plain-text ip
# alias python="python3"
alias speedtest="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -"
# alias rpass="openssl rand -base64"
# alias rwssl1="RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)""
# alias rwssl3="RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@3)""
###### Alias

# Funtion to change Homebrew PostgreSQL version
# function brewpostgres() {
#   brew services stop postgresql@$1
#   sleep 1
#   brew unlink postgresql@$1
#   sleep 1
#   brew link postgresql@$2
#   sleep 1
#   brew services start postgresql@$2
# }

# Set PATH
path=("/opt/homebrew/opt/coreutils/libexec/gnubin" $path)
path=("/opt/homebrew/opt/grep/libexec/gnubin" $path)
path=("/opt/homebrew/opt/make/libexec/gnubin" $path)
# path=("/opt/homebrew/opt/llvm/bin" $path)
# path=("./bin" $path)
# path=("/Users/Shared/DBngin/mysql/5.7.23/bin" $path)

###### Ngrok completions
if command -v /opt/homebrew/bin/ngrok &>/dev/null; then
  eval "$(/opt/homebrew/bin/ngrok completion)"
fi
