#!/bin/bash

# tmux requires unrecognized OSC sequences to be wrapped with DCS tmux;
# <sequence> ST, and for all ESCs in <sequence> to be replaced with ESC ESC. It
# only accepts ESC backslash for ST.
function print_osc() {
    if [[ $TERM == screen* ]] ; then
        printf "\033Ptmux;\033\033]"
    else
        printf "\033]"
    fi
}

# More of the tmux workaround described above.
function print_st() {
    if [[ $TERM == screen* ]] ; then
        printf "\a\033\\"
    else
        printf "\a"
    fi
}

# print_image filename inline base64contents print_filename
#   filename: Filename to convey to client
#   inline: 0 or 1
#   base64contents: Base64-encoded contents
#   print_filename: If non-empty, print the filename 
#                   before outputting the image
function print_image() {
    print_osc
    printf '1337;File='
    if [[ -n "$1" ]]; then
      printf 'name='`printf "%s" "$1" | base64`";"
    fi

    VERSION=$(base64 --version 2>&1)
    if [[ "$VERSION" =~ fourmilab ]]; then
      BASE64ARG=-d
    elif [[ "$VERSION" =~ GNU ]]; then
      BASE64ARG=-di
    else
      BASE64ARG=-D
    fi

    printf "%s" "$3" | base64 $BASE64ARG | wc -c | awk '{printf "size=%d",$1}'
    printf ";inline=$2"
    printf ":"
    printf "%s" "$3"
    print_st
    printf '\n'
    if [[ -n "$4" ]]; then
      echo $1
    fi
}

function error() {
    echo "ERROR: $*" 1>&2
}

function show_help() {
    echo "Usage: imgcat [-p] filename ..." 1>& 2
    echo "   or: cat filename | imgcat" 1>& 2
}

## Main

if [ -t 0 ]; then
    has_stdin=f
else
    has_stdin=t
fi

# Show help if no arguments and no stdin.
if [ $has_stdin = f -a $# -eq 0 ]; then
    show_help
    exit
fi

# Look for command line flags.
while [ $# -gt 0 ]; do
    case "$1" in
    -h|--h|--help)
        show_help
        exit
        ;;
    -p|--p|--print)
        print_filename=1
        ;;
    -*)
        error "Unknown option flag: $1"
        show_help
        exit 1
      ;;
    *)
        if [ -r "$1" ] ; then
            has_stdin=f
            print_image "$1" 1 "$(base64 < "$1")" "$print_filename"
        else
            error "imgcat: $1: No such file or directory"
            exit 2
        fi
        ;;
    esac
    shift
done

# Read and print stdin
if [ $has_stdin = t ]; then
    print_image "" 1 "$(cat | base64)" ""
fi

exit 0
