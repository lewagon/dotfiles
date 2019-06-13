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

Plugin 'tpope/vim-rails'
Plugin 'tpope/vim-surround'
Plugin 'tpope/vim-commentary'
Plugin 'scrooloose/nerdtree'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'godlygeek/tabular'
Plugin 'vim-ruby/vim-ruby'
Plugin 'mattn/gist-vim'
Plugin 'mattn/webapi-vim'
Plugin 'vim-scripts/snippetsEmu'

let mapleader=","
let localmapleader=","

map <Leader>, :CtrlPMRU<CR>

noremap \= :Tabularize /=<CR>
noremap \: :Tabularize /^[^:]*:\zs/l0l1<CR>
noremap \> :Tabularize /=><CR>
noremap \, :Tabularize /,\zs/l0l1<CR>
noremap \{ :Tabularize /{<CR>
noremap \\| :Tabularize /\|<CR>
noremap \& :Tabularize /\(&\\|\\\\\)<CR>

nnoremap <Leader>t :TagbarOpen fjc<CR>

call vundle#end()            " Nécessaire
filetype plugin indent on    " Nécessaire
set relativenumber
syntax on
set backspace=indent,eol,start
set tabstop=2 shiftwidth=2 expandtab
if has("multi_byte")
  set encoding=utf-8
  setglobal fileencoding=utf-8
else
  echoerr "Sorry, this version of (g)vim was not compiled with +multi_byte"
endif
