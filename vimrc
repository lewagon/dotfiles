set nocompatible      " Nécessaire
filetype off          " Nécessaire

" Ajout de Vundle au runtime path et initialisation
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" On indique à Vundle de s'auto-gérer :)
Plugin 'gmarik/Vundle.vim'  " Nécessaire

"
" C'est ici que vous allez placer la liste des plugins que Vundle doit gérer
"

Plugin 'tpope/vim-rails.git'
Plugin 'scrooloose/nerdtree'

call vundle#end()            " Nécessaire
filetype plugin indent on    " Nécessaire

syntax on
set backspace=indent,eol,start
set tabstop=2 shiftwidth=2 expandtab
if has("multi_byte")
  set encoding=utf-8
  setglobal fileencoding=utf-8
else
  echoerr "Sorry, this version of (g)vim was not compiled with +multi_byte"
endif
