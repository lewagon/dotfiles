runtime macros/matchit.vim
" This needs to be off for Vundle, turned back on after
set nocompatible      " Nécessaire
filetype off          " Nécessaire

" Ajout de Vundle au runtime path et initialisation
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" On indique à Vundle de s'auto-gérer :)
Plugin 'gmarik/Vundle.vim'  " Nécessaire
" Vim Plugins
" Bundle 'AndrewRadev/vim-eco'
" Bundle 'Lokaltog/vim-powerline'
Plugin 'altercation/vim-colors-solarized'
Plugin 'cakebaker/scss-syntax.vim'
" Bundle 'ervandew/screen'
" Bundle 'ervandew/supertab'
Plugin 'godlygeek/tabular'
" Bundle 'groenewege/vim-less'
" Bundle 'isRuslan/vim-es6'
" Bundle 'mxw/vim-jsx'
Plugin 'kien/ctrlp.vim'
Plugin 'mattn/gist-vim'
Plugin 'mattn/webapi-vim'
" Bundle 'mileszs/ack.vim'
" Bundle 'nviennot/molokai'
" Bundle 'othree/html5.vim'
" Bundle 'rking/ag.vim'
" Bundle 'rodjek/vim-puppet'
" Bundle 'scrooloose/nerdcommenter'
Plugin 'scrooloose/nerdtree'
" Bundle 'scrooloose/syntastic'
" Bundle 'sjl/gundo.vim'
Plugin 'tomtom/quickfixsigns_vim'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-rails'
Plugin 'tpope/vim-surround'
" Bundle 'vim-scripts/YankRing.vim'
" Bundle 'yaymukund/vim-rabl'

" Bundle 'tpope/vim-unimpaired'
" Bundle 'tpope/vim-repeat'
Plugin 'tpope/vim-commentary'
Plugin 'vim-ruby/vim-ruby'
Plugin 'vim-scripts/snippetsEmu'
Plugin 'chrisbra/matchit'                        " jump to closing tag with % in html

"""""""""""""""""""
" MAP
"""""""""""""""""""
" Normal Mode Mapping
nmap § >
nmap è %
nmap ç /
nmap à .
nmap ù %

let mapleader = " "
let localmapleader = ","
"let mapleader = "\<Space>"
"let localmapleader = "\<Space>"
map <Leader>, :CtrlPMRU<CR>
map <Leader>gitdif :Gdiffsplit<CR>
map <Leader>o <C-w>o<Esc>
map <Leader>O <C-w>O<Esc>

" Moving between windows
map <Leader>h <C-w>h
map <Leader>j <C-w>j
map <Leader>k <C-w>k
map <Leader>l <C-w>l
map <Leader>H <C-w>H
map <Leader>J <C-w>J
map <Leader>K <C-w>K
map <Leader>L <C-w>L
map <Leader>nm ]m
map <Leader>pm [m

" Open new file
map <Leader>snippet :tabe ~/code/alexandrebk/dotfiles/snippets<CR>
map <Leader>vimrc :tabe $MYVIMRC<CR>
map <Leader>rc :tabe $MYVIMRC<CR>
map <Leader>routes :tabe config/routes.rb<CR>
map <Leader>so :source $MYVIMRC<CR>
map <Leader>sc :tabe db/schema.rb<CR>
map <Leader>tree :tabe .<CR>jjjj
map <Leader>new :tabe .<CR>jjjj
map <Leader>spec :tabe spec<CR>jjjj
map <Leader>app :tabe app<CR>jjjj
map <Leader>models :tabe app/models<CR>jjjj
map <Leader>con :tabe app/controllers<CR>jjjj
map <Leader>views :tabe app/views<CR>jjjj
map <Leader>mail :tabe app/mailers<CR>jjjj
map <Leader>job :tabe app/jobs<CR>jjjj
map <Leader>assets :tabe app/assets<CR>jjjj
map <Leader>db :tabe db<CR>jjjj
map <Leader>javascript :tabe app/javascript<CR>jjjj
map <Leader>railsc :!rails console<CR>
map <Leader>migration :!rails g migration

" RSpec mapping
map <Leader>rspecall :! bundle exec rspec<CR>
map <Leader>rspecfile :! bundle exec rspec %<CR>
map <Leader>rspecnear :! bundle exec rspec %:<C-r>=line('.')<CR><CR>

map <Leader>= :Tabularize /=<CR>
map <Leader>: :Tabularize /^[^:]*:\zs/l0l1<CR>

" Insert Mode Mapping
imap jk <ESC>:w<CR>
imap kj <ESC>:w<CR>
imap § #{}<Left>
autocmd FileType ruby          imap debug<Tab> puts "-"*30


"""""""""""""""""""""""""
" Basic features
"""""""""""""""""""""""""

" SET and Display options
syntax on
set noerrorbells
set smartindent
set smartcase
set number
set backspace=indent,eol,start
set tags=tags
set wrap                         " not wrapping lines
set cursorline                   " set line under cursor
set cursorcolumn                 " set line under cursor
set incsearch                    " incremental search
" set hlsearch                     " highlight search
" set nocursorline
" set encoding=utf-8
" set fileencoding=utf-8
" set list!
" set listchats=tab:▸\ ,trail:•,extends:»,precedes:«
"colorscheme molokai


" Misc
" filetype plugin indent on
" set hiddent

" let g:netrw_cursorline=0


" shift+k -> like shift+j, but no extra space
" noremap <S-k> gJ

" Formatting, indentation and tabbing
" set autoindent smartindent
" set smarttab                    " Make <tab> and <backspace> smarter
set expandtab
set tabstop=2
set shiftwidth=2
" set textwidth=80
" set formatoptions-=t formatoptions+=croql

" viminfo:

" ctags:

" Undo
"

" Search settings

" to_html settings

" When opening a file, always jump to the last cursor position
autocmd BufReadPost *
    \ if line("'\"") > 0 && line ("'\"") <= line("$") |
    \     exe "normal g'\"zz" |
    \ endif |

"""""""""""""""""""""""""
" Keybindings
"""""""""""""""""""""""""

" After 4s of inactivity, check for external file modifications on next keyrpress
" au CursorHold * checktime

let g:NERDTreeWinPos = "left"                                    " Nerd Tree positioning at left
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'        " custom ignores files for ctrlP
nnoremap <C-n> :set number! relativenumber!<cr>
nnoremap <C-i> ggVG=`.
nnoremap <Up>    3<C-w>-
nnoremap <Down>  3<C-w>+
nnoremap <Left>  3<C-w><
nnoremap <Right> 3<C-w>>
nnoremap <C-g> :NERDTreeToggle<cr>

" Tabularize mapping
noremap \= :Tabularize /=<CR>
noremap \: :Tabularize /^[^:]*:\zs/l0l1<CR>
noremap \> :Tabularize /=><CR>
noremap \, :Tabularize /,\zs/l0l1<CR>
noremap \{ :Tabularize /{<CR>
noremap \\| :Tabularize /\|<CR>
noremap \& :Tabularize /\(&\\|\\\\\)<CR>

map <C-\> :ScreenShellVertical<CR>

call vundle#end()            " Nécessaire
filetype plugin indent on    " Nécessaire


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


" Vim color file
"
" Author: Tomas Restrepo <tomas@winterdom.com>
"
" Note: Based on the monokai theme for textmate
" by Wimer Hazenberg and its darker variant
" by Hamish Stuart Macpherson
" Keyword --> http://vimdoc.sourceforge.net/htmldoc/syntax.html
" Color   --> https://jonasjacek.github.io/colors/
" To find syntax group of the current character
" :
" let s = synID(line('.'), col('.'), 1) | echo synIDattr(s, 'name') . ' -> ' . synIDattr(synIDtrans(s), 'name')

hi clear

set background=dark
if version > 580
    " no guarantees for version 5.8 and below, but this makes it stop
    " complaining
    hi clear
    if exists("syntax_on")
        syntax reset
    endif
endif
let g:colors_name="molokai"

if exists("g:molokai_original")
    let s:molokai_original = g:molokai_original
else
    let s:molokai_original = 0
endif

"
" Support for 256-color terminal
"

if &t_Co > 255
  hi Cursor          ctermfg=16  ctermbg=253
  hi MatchParen      ctermfg=16  ctermbg=208   cterm=bold

  " 59 --> Grey37
  hi Comment         ctermfg=59
  hi Todo            ctermfg=59  ctermbg=232   cterm=bold

  " 81 --> SteelBlue1
  hi FoldColumn      ctermfg=81  ctermbg=16
  hi Folded          ctermfg=81  ctermbg=16
  hi SpecialKey      ctermfg=81
  hi Pmenu           ctermfg=81  ctermbg=16
  hi PmenuThumb      ctermfg=81
  hi Question        ctermfg=81
  hi Special         ctermfg=81  ctermbg=232
  hi Structure       ctermfg=81
  hi Typedef         ctermfg=81
  hi WildMenu        ctermfg=81  ctermbg=16
  hi Macro           ctermfg=81

  " 118 --> Green (Chartreuse1) Changer de vert celui la est trop flashy
  hi Directory       ctermfg=118               cterm=bold
  hi Exception       ctermfg=118               cterm=bold
  hi Function        ctermfg=118
  hi PreCondit       ctermfg=118               cterm=bold
  hi SignColumn      ctermfg=118 ctermbg=235
  hi Type            ctermfg=118               cterm=none
  hi RubyConstant    ctermfg=118               cterm=none

  " 135 --> MediumPurple2
  hi Boolean         ctermfg=135
  hi Character       ctermfg=135
  hi Number          ctermfg=135
  hi Float           ctermfg=135
  hi Constant        ctermfg=135               cterm=bold

  " 161 --> Red (DeepPink3)
  hi Conditional     ctermfg=161               cterm=bold
  hi Define          ctermfg=161
  hi Statement       ctermfg=161               cterm=bold
  hi Label           ctermfg=161               cterm=none
  hi Tag             ctermfg=161
  hi Keyword         ctermfg=161               cterm=bold
  hi Operator        ctermfg=161
  hi Repeat          ctermfg=161               cterm=bold
  hi SpecialChar     ctermfg=161               cterm=bold
  hi DiffDelete      ctermfg=161 ctermbg=53
  hi rubyAccess      ctermfg=161

  " 193 --> DarkSeaGreen1
  hi IncSearch       ctermfg=193 ctermbg=16

  hi ErrorMsg        ctermfg=199 ctermbg=16    cterm=bold

  " 208 --> Orange
  hi Identifier         ctermfg=208
  hi StorageClass       ctermfg=208
  hi rubyPseudoVariable ctermfg=208

  hi Error           ctermfg=219 ctermbg=89

  hi Debug           ctermfg=225               cterm=bold

  " 228 --> Yellow
  hi String          ctermfg=228
  hi ModeMsg         ctermfg=228
  hi MoreMsg         ctermfg=228

  " 231 White
  hi WarningMsg      ctermfg=231 ctermbg=238   cterm=bold
  hi htmlTag         ctermfg=231
  hi htmlEndTag      ctermfg=231
  hi Title           ctermfg=231
  hi PreProc         ctermfg=231
  hi rubyViewHelper  ctermfg=231
  hi rubyValidation  ctermfg=231

  hi StatusLine      ctermfg=238 ctermbg=253

  " 244 Grey50
  hi Delimiter       ctermfg=244
  hi Ignore          ctermfg=244 ctermbg=232
  hi StatusLineNC    ctermfg=244 ctermbg=232
  hi Underlined      ctermfg=244               cterm=underline
  hi VertSplit       ctermfg=244 ctermbg=232   cterm=bold
  hi SpecialComment  ctermfg=244               cterm=bold
  hi SpecialKey      ctermfg=244

  " 244 Grey74
  hi LineNr          ctermfg=252 ctermbg=234
  hi NonText         ctermfg=252 ctermbg=234
  hi Normal          ctermfg=252 ctermbg=233
  hi Search          ctermfg=252 ctermbg=66

  hi VisualNOS                   ctermbg=238
  hi Visual                      ctermbg=235
  hi CursorLine                  ctermbg=234   cterm=none
  hi CursorColumn                ctermbg=234
  hi PmenuSbar                   ctermbg=232
  hi DiffAdd                     ctermbg=24
  hi DiffText                    ctermbg=102   cterm=bold
  hi PmenuSel                    ctermbg=244
end

hi CursorLine gui=underline cterm=underline "add
hi Normal ctermbg=16
