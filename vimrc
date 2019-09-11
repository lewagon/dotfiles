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
Plugin 'tpope/vim-fugitive'
Plugin 'scrooloose/nerdtree'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'godlygeek/tabular'
Plugin 'vim-ruby/vim-ruby'
Plugin 'mattn/gist-vim'
Plugin 'mattn/webapi-vim'
Plugin 'vim-scripts/snippetsEmu'
Plugin 'altercation/vim-colors-solarized'
Plugin 'vim-scripts/code_complete'

let mapleader=","
let localmapleader=","
let g:NERDTreeWinPos = "left"

map <Leader>, :CtrlPMRU<CR>

noremap \= :Tabularize /=<CR>
noremap \: :Tabularize /^[^:]*:\zs/l0l1<CR>
noremap \> :Tabularize /=><CR>
noremap \, :Tabularize /,\zs/l0l1<CR>
noremap \{ :Tabularize /{<CR>
noremap \\| :Tabularize /\|<CR>
noremap \& :Tabularize /\(&\\|\\\\\)<CR>

nnoremap <Leader>t :TagbarOpen fjc<CR>
nnoremap <C-g> :NERDTreeToggle<cr>
nnoremap <C-n> :set number! relativenumber!<cr>
nnoremap <C-i> ggVG=

call vundle#end()            " Nécessaire
filetype plugin indent on    " Nécessaire
set relativenumber
syntax on
set backspace=indent,eol,start
set tabstop=2 shiftwidth=2 expandtab
set tags=tags

" For altercation/vim-colors-solarized
syntax enable
set background=dark
let g:solarized_termcolors=256
colorscheme solarized

if has("multi_byte")
  set encoding=utf-8
  setglobal fileencoding=utf-8
else
  echoerr "Sorry, this version of (g)vim was not compiled with +multi_byte"
endif
