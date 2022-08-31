#/usr/bin/env bash

# OVERVIEW
#   Adds autocompletion to dbt CLI by:
#       1. Finding the root of the repo (identified by dbt_project.yml
#       2. Parsing target/manifest.json file, extracting valid model selectors
#       3. Doing some bash magic to autocomplete selectors for:
#           -m
#           --model[s]
#           -s
#           --select
#           --exclude
#
# NOTE: This script uses the manifest (assumed to be at target/manifest.json)
#       to _quickly_ provide a list of existing selectors. As such, a dbt
#       resource must be compiled before it will be available for tab completion.
#       In the future, this script should use dbt directly to parse the project
#       directory and generate possible selectors. Until then, brand new
#       models/sources/tags/packages will not be displayed in the tab complete menu
#
# INSTALLATION
#   1. Copy dbt-completion.bash to your home directory (as a dotfile, probably)
#     cp dbt-completion.bash ~/.dbt-completion.bash
#
#   2. Source it
#     source ~/.dbt-completion.bash
#
#   3. Install it into your ~/.profile file
#     echo 'source ~/.dbt-completion.bash' >> ~/.bash_profile
#
#   4. Use it with:
#     dbt run --models snow<tab>
#
#
# CREDITS
#   Made possible by this great tutorial on bash completion:
#   https://iridakos.com/tutorials/2018/03/01/bash-programmable-completion-tutorial.html
#
#  Inspired by git-completion.bash
#  https://github.com/git/git/blob/master/contrib/completion/git-completion.bash


# Inline a python script so we can deploy this as a single file
# the idea of doing this in bash natively is... daunting
_parse_manifest() {
manifest_path=$1
prefix=$2
prog=$(cat <<EOF
# Use a big try/catch so any errors (maybe from a corrupted or
# missing manifest?) are not printed on tab-complete

try:
    import fileinput, json, sys

    # If a prefix is given as an argument, include it in the
    # generated selector list. The bash completion logic below
    # will match these generated selectors against partially
    # written args when table completed. This helps the script
    # match selectors when a user does something like:
    #   dbt run --models +order<tab>

    prefix = sys.argv.pop() if len(sys.argv) == 2 else ""

    manifest = json.loads("\n".join([line for line in fileinput.input()]))

    models = set(
        "{}{}".format(prefix, node['name'])
        for node in manifest['nodes'].values()
        if node['resource_type'] in ['model', 'seed']
    )

    tags = set(
        "{}tag:{}".format(prefix, tag)
        for node in manifest['nodes'].values()
        for tag in node.get('tags', [])
        if node['resource_type'] == 'model'
    )

    # The + prefix for sources is not sensible, but allowed.
    # This script shouldn't be opinionated about these things
    sources = set(
        "{}source:{}".format(prefix, node['source_name'])
        for node in manifest['nodes'].values()
        if node['resource_type'] == 'source'
    ) | set(
        "{}source:{}.{}".format(prefix, node['source_name'], node['name'])
        for node in manifest['nodes'].values()
        if node['resource_type'] == 'source'
    )

    # Generate partial Fully Qualified Names with a wildcard
    # suffix. This matches things like directories and packag names
    fqns = set(
        "{}{}.*".format(prefix, ".".join(node['fqn'][:i-1]))
        for node in manifest['nodes'].values()
        for i in range(len(node.get('fqn', [])))
        if node['resource_type'] == 'model'
    )

    selectors = [
        selector
        for selector in (models | tags | sources | fqns)
        if selector != ''
    ]

    print("\n".join(selectors))
except Exception as e:
    print(e)
    # oops!
    pass
EOF
)

cat "$manifest_path" | python -c "$prog" $prefix
}

# Iterate backwards in the arg list from the index
# and return the first flag that we find (ie. an
# argument that begins with a '-'
_get_last_flag() {
    arg_index=$1
    shift
    arg_list=("$@")

    first_flag=""
    for i in $(seq $arg_index -1 0); do
        arg=${arg_list[$i]}
        if [[ $arg == -* ]] ; then
            first_flag=$arg
            break
        fi
    done

    echo $first_flag
}

# Return 0 if the supplied flag accepts a selector as an argument
# or 1 if it does not. Python's argparse supports flag prefixes
# so, this method matches both --model and --models. Probably not
# appropriate to support prefixes of exclude, for instance
_flag_is_selector() {
    flag=$1

    if [[ $flag == '-m' ]] || \
       [[ $flag == --model* ]] || \
       [[ $flag == '-s' ]] || \
       [[ $flag == '--select' ]] || \
       [[ $flag ==  '--exclude' ]] ;
    then
        echo 0
    else
        echo 1
    fi
}

# Pluck out and return the first character in the arg if it is
# a supported node selection modifier (ie. + or @)
_get_arg_prefix() {
    arg=$1
    first_char=${arg:0:1}
    if [[ $first_char == '+' ]] || [[ $first_char == '@' ]] ; then
        echo "$first_char"
    else
        echo ""
    fi
}

# Walk up the filesystem until we find a dbt_project.yml file,
# then return the path which contains it (if found)
_get_project_root() {
  slashes=${PWD//[^\/]/}
  directory="$PWD"
  for (( n=${#slashes}; n>0; --n ))
  do
    test -e "$directory/dbt_project.yml" && echo "$directory" && return
    directory="$directory/.."
  done
}


# Core bash completion logic
_complete_it() {
    # Requires bash-completion, used to handle ':' chars in args
    if [[ -n "$BASH" ]] && [[ $(type -t _get_comp_words_by_ref) == 'function' ]]; then
        local cur
        _get_comp_words_by_ref -n : cur
    fi

    # Find the first present flag to the left of the cursor, then
    # determine if the flag operates as a node selector
    last_flag=$(_get_last_flag $COMP_CWORD "${COMP_WORDS[@]}")
    is_selector=$(_flag_is_selector $last_flag)

    if [[ $is_selector == 0 ]] ; then
        current_arg="${COMP_WORDS[$COMP_CWORD]}"
        prefix=$(_get_arg_prefix $current_arg)
        project_dir=$(_get_project_root)

        # Attempt to fetch the manifest path from the environment variable
        if [ -z "$DBT_MANIFEST_PATH" ] ; then
            manifest_path="${project_dir}/target/manifest.json"
        else
            manifest_path="$DBT_MANIFEST_PATH"
        fi

        # Bail out if we can't find a manifest
        if [ ! -f "$manifest_path" ] ; then
            return
        fi

        selectors=$(_parse_manifest "$manifest_path" $prefix)

        # If the cursor is in the middle of a flag, don't try to tab complete
        # it. This would lead to errors with compgen. Otherwise, supply the
        # possible selectors to the compgen program
        if [[ $current_arg == -* ]] ; then
            COMPREPLY=($(compgen -W "$selectors" ""))
        else
            COMPREPLY=($(compgen -W "$selectors" "$current_arg"))
        fi

        # Requires bash-completion, used to handle ':' chars in args
        if [[ -n "$BASH" ]] && [[ $(type -t __ltrim_colon_completions ) == 'function' ]] ; then
            __ltrim_colon_completions "$cur"
        fi
    fi
}

complete -F _complete_it dbt
