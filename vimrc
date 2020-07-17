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
"

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


hi Boolean         guifg=#AE81FF
hi Character       guifg=#E6DB74
hi Number          guifg=#AE81FF
hi String          guifg=#E6DB74
hi Conditional     guifg=#F92672               gui=bold
hi Constant        guifg=#AE81FF               gui=bold
hi Cursor          guifg=#000000 guibg=#F8F8F0
hi Debug           guifg=#BCA3A3               gui=bold
hi Define          guifg=#66D9EF
hi Delimiter       guifg=#8F8F8F
hi DiffAdd                       guibg=#13354A
hi DiffChange      guifg=#89807D guibg=#4C4745
hi DiffDelete      guifg=#960050 guibg=#1E0010
hi DiffText                      guibg=#4C4745 gui=italic,bold

hi Directory       guifg=#A6E22E               gui=bold
hi Error           guifg=#960050 guibg=#1E0010
hi ErrorMsg        guifg=#F92672 guibg=#232526 gui=bold
hi Exception       guifg=#A6E22E               gui=bold
hi Float           guifg=#AE81FF
hi FoldColumn      guifg=#465457 guibg=#000000
hi Folded          guifg=#465457 guibg=#000000
hi Function        guifg=#A6E22E
hi Identifier      guifg=#FD971F
hi Ignore          guifg=#808080 guibg=bg
hi IncSearch       guifg=#C4BE89 guibg=#000000

hi Keyword         guifg=#F92672               gui=bold
hi Label           guifg=#E6DB74               gui=none
hi Macro           guifg=#C4BE89               gui=italic
hi SpecialKey      guifg=#66D9EF               gui=italic

hi MatchParen      guifg=#000000 guibg=#FD971F gui=bold
hi ModeMsg         guifg=#E6DB74
hi MoreMsg         guifg=#E6DB74
hi Operator        guifg=#F92672

" complete menu
hi Pmenu           guifg=#66D9EF guibg=#000000
hi PmenuSel                      guibg=#808080
hi PmenuSbar                     guibg=#080808
hi PmenuThumb      guifg=#66D9EF

hi PreCondit       guifg=#A6E22E               gui=bold
hi PreProc         guifg=#A6E22E
hi Question        guifg=#66D9EF
hi Repeat          guifg=#F92672               gui=bold
hi Search          guifg=#FFFFFF guibg=#455354
" marks column
hi SignColumn      guifg=#A6E22E guibg=#232526
hi SpecialChar     guifg=#F92672               gui=bold
hi SpecialComment  guifg=#465457               gui=bold
hi Special         guifg=#66D9EF guibg=bg      gui=italic
hi SpecialKey      guifg=#888A85               gui=italic
if has("spell")
    hi SpellBad    guisp=#FF0000 gui=undercurl
    hi SpellCap    guisp=#7070F0 gui=undercurl
    hi SpellLocal  guisp=#70F0F0 gui=undercurl
    hi SpellRare   guisp=#FFFFFF gui=undercurl
endif
hi Statement       guifg=#F92672               gui=bold
hi StatusLine      guifg=#455354 guibg=fg
hi StatusLineNC    guifg=#808080 guibg=#080808
hi StorageClass    guifg=#FD971F               gui=italic
hi Structure       guifg=#66D9EF
hi Tag             guifg=#F92672               gui=italic
hi Title           guifg=#ef5939
hi Todo            guifg=#FFFFFF guibg=bg      gui=bold

hi Typedef         guifg=#66D9EF
hi Type            guifg=#66D9EF               gui=none
hi Underlined      guifg=#808080               gui=underline

hi VertSplit       guifg=#808080 guibg=#080808 gui=bold
hi VisualNOS                     guibg=#403D3D
hi Visual                        guibg=#403D3D
hi WarningMsg      guifg=#FFFFFF guibg=#333333 gui=bold
hi WildMenu        guifg=#66D9EF guibg=#000000

if s:molokai_original == 1
   hi Normal          guifg=#F8F8F2 guibg=#272822
   hi Comment         guifg=#75715E
   hi CursorLine                    guibg=#3E3D32
   hi CursorColumn                  guibg=#3E3D32
   hi LineNr          guifg=#BCBCBC guibg=#3B3A32
   hi NonText         guifg=#BCBCBC guibg=#3B3A32
else
   hi Normal          guifg=#F8F8F2 guibg=#1B1D1E
   hi Comment         guifg=#465457
   hi CursorLine                    guibg=#293739
   hi CursorColumn                  guibg=#293739
   hi LineNr          guifg=#BCBCBC guibg=#232526
   hi NonText         guifg=#BCBCBC guibg=#232526
end

"
" Support for 256-color terminal
"
if &t_Co > 255
   hi Boolean         ctermfg=135
   hi Character       ctermfg=144
   hi Number          ctermfg=135
   hi String          ctermfg=144
   hi Conditional     ctermfg=161               cterm=bold
   hi Constant        ctermfg=135               cterm=bold
   hi Cursor          ctermfg=16  ctermbg=253
   hi Debug           ctermfg=225               cterm=bold
   hi Define          ctermfg=161
   hi Delimiter       ctermfg=241

   hi DiffAdd                     ctermbg=24
   hi DiffChange      ctermfg=181 ctermbg=239
   hi DiffDelete      ctermfg=162 ctermbg=53
   hi DiffText                    ctermbg=102 cterm=bold

   hi Directory       ctermfg=118               cterm=bold
   hi Error           ctermfg=219 ctermbg=89
   hi ErrorMsg        ctermfg=199 ctermbg=16    cterm=bold
   hi Exception       ctermfg=118               cterm=bold
   hi Float           ctermfg=135
   hi FoldColumn      ctermfg=67  ctermbg=16
   hi Folded          ctermfg=67  ctermbg=16
   hi Function        ctermfg=118
   hi Identifier      ctermfg=208
   hi Ignore          ctermfg=244 ctermbg=232
   hi IncSearch       ctermfg=193 ctermbg=16

   hi Keyword         ctermfg=161               cterm=bold
   hi Label           ctermfg=229               cterm=none
   hi Macro           ctermfg=193
   hi SpecialKey      ctermfg=81

   hi MatchParen      ctermfg=16  ctermbg=208 cterm=bold
   hi ModeMsg         ctermfg=229
   hi MoreMsg         ctermfg=229
   hi Operator        ctermfg=161

   " complete menu
   hi Pmenu           ctermfg=81  ctermbg=16
   hi PmenuSel                    ctermbg=244
   hi PmenuSbar                   ctermbg=232
   hi PmenuThumb      ctermfg=81

   hi PreCondit       ctermfg=118               cterm=bold
   hi PreProc         ctermfg=118
   hi Question        ctermfg=81
   hi Repeat          ctermfg=161               cterm=bold
   hi Search          ctermfg=253 ctermbg=66

   " marks column
   hi SignColumn      ctermfg=118 ctermbg=235
   hi SpecialChar     ctermfg=161               cterm=bold
   hi SpecialComment  ctermfg=245               cterm=bold
   hi Special         ctermfg=81  ctermbg=232
   hi SpecialKey      ctermfg=245

   hi Statement       ctermfg=161               cterm=bold
   hi StatusLine      ctermfg=238 ctermbg=253
   hi StatusLineNC    ctermfg=244 ctermbg=232
   hi StorageClass    ctermfg=208
   hi Structure       ctermfg=81
   hi Tag             ctermfg=161
   hi Title           ctermfg=166
   hi Todo            ctermfg=231 ctermbg=232   cterm=bold

   hi Typedef         ctermfg=81
   hi Type            ctermfg=81                cterm=none
   hi Underlined      ctermfg=244               cterm=underline

   hi VertSplit       ctermfg=244 ctermbg=232   cterm=bold
   hi VisualNOS                   ctermbg=238
   hi Visual                      ctermbg=235
   hi WarningMsg      ctermfg=231 ctermbg=238   cterm=bold
   hi WildMenu        ctermfg=81  ctermbg=16

   hi Normal          ctermfg=252 ctermbg=233
   hi Comment         ctermfg=59
   hi CursorLine                  ctermbg=234   cterm=none
   hi CursorColumn                ctermbg=234
   hi LineNr          ctermfg=250 ctermbg=234
   hi NonText         ctermfg=250 ctermbg=234
end

hi CursorLine gui=underline cterm=underline "add
hi Normal ctermbg=16
