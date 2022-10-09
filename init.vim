let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Plugin Section
call plug#begin()
Plug 'tpope/vim-sensible'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'tpope/vim-commentary'
Plug 'junegunn/fzf.vim'
Plug 'Vimjas/vim-python-pep8-indent'
Plug 'jeetsukumaran/vim-pythonsense'
Plug 'jiangmiao/auto-pairs'
Plug 'numirias/semshi'
Plug 'dense-analysis/ale'
Plug 'davidhalter/jedi-vim'
Plug 'dart-lang/dart-vim-plugin'
Plug 'vimwiki/vimwiki'
Plug 'mattn/calendar-vim'
Plug 'ferrine/md-img-paste.vim'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'numirias/semshi', { 'do': ':UpdateRemotePlugins', 'for': 'python' }
Plug 'junegunn/vim-emoji'
Plug 'elzr/vim-json'
Plug 'ervandew/supertab'
Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug']}
Plug 'github/copilot.vim'
Plug 'projekt0n/github-nvim-theme'
Plug 'christoomey/vim-tmux-navigator'
Plug 'christoomey/vim-tmux-runner'
Plug 'kien/ctrlp.vim'

call plug#end()

" Config Section

set number
:augroup numbertoggle
:  autocmd!
:  autocmd BufEnter,FocusGained,InsertLeave,WinEnter * if &nu && mode() != "i" | set rnu   | endif
:  autocmd BufLeave,FocusLost,InsertEnter,WinLeave   * if &nu                  | set nornu | endif
:augroup END

set nocompatible
set smartindent
filetype plugin on
syntax on
set expandtab
set tabstop=4
set shiftwidth=4

" Security Section
set noswapfile
set nobackup
set nowritebackup
set viminfo=

au BufNewFile,BufRead *.py \
  set foldmethod=indent

au BufNewFile,BufRead Jenkinsfile setf groovy

let g:ale_linters = {
      \   'python': ['flake8', 'pylint'],
      \   'ruby': ['standardrb', 'rubocop'],
      \   'javascript': ['eslint'],
      \   'sql': ['sqlfluff', 'sqlint', 'sqllint'],
      \}
let g:ale_fixers = {
      \    'python': ['black'],
      \}
let g:ale_fix_on_save = 1

let g:nv_search_paths = ['~/workspace/perso/notes','~/workspace/perso/wiki', './notes.md', './doc', './notes']
let g:nv_main_directory = '~/workspace/perso/notes'
let g:vimwiki_list = [{
			\'path':'~/workspace/perso/wiki/wiki', 
			\'syntax': 'markdown', 'ext': '.md',
			\'custom_wiki2html': '~/workspace/perso/wiki/wk2html.sh',
			\'path_html':'~/workspace/perso/wiki/docs', 
			\'template_path': '~/workspace/perso/wiki/templates',
			\'template_default':'default',
			\'template_ext':'.html'}]
let g:vimwiki_global_ext = 0

au FileType vimwiki setlocal shiftwidth=6 tabstop=6 noexpandtab
autocmd FileType sql setlocal shiftwidth=4 tabstop=4



" Keybindings Section
let mapleader = ","
nnoremap <space> za
nnoremap <silent> <leader>nt :NERDTreeToggle<CR>
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
nnoremap <silent> K :call <SID>show_documentation()<CR>
nmap <leader>rn <Plug>(coc-rename)
nmap <buffer> <silent> <leader>p :call mdip#MarkdownClipboardImage()<CR>
let g:mdip_imgdir = 'img'
nmap <silent> <c-s> :NV<CR>
nmap <silent> <leader>ts i<C-R>=strftime("%a %d %b %Y %I:%M:%S %p %Z")<CR><Esc>
nnoremap <silent> <leader>em :%s/:\([^:]\+\):/\=emoji#for(submatch(1), submatch(0))/g<CR>
inoremap <silent> ALT-) <Plug>(copilot-next)
inoremap <silent> ALT-( <Plug>(copilot-previous)


" Custom Functions Section

"" Displays the number of Warnings and Errors in Status Line
function! LinterStatus() abort
  let l:counts = ale#statusline#Count(bufnr(''))

  let l:all_errors = l:counts.error + l:counts.style_error
  let l:all_non_errors = l:counts.total - l:all_errors

  return l:counts.total == 0 ? '✨ all good ✨' : printf(
        \   '😞 %dW %dE',
        \   all_non_errors,
        \   all_errors
        \)
endfunction

set statusline=
set statusline+=%m
set statusline+=\ %f
set statusline+=%=
set statusline+=\ %{LinterStatus()}

" Shows documentation
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" VimWiki diary settings
command! Diary VimwikiDiaryIndex
augroup vimwikigroup
    autocmd!
    " automatically update links on read diary
    autocmd BufRead,BufNewFile diary.wiki VimwikiDiaryGenerateLinks
augroup end

" VimWiki git sync
augroup vimwikigitsync
  " Make sure this window's working dir is the wiki repo dir whenever index.wiki is opened
  au BufRead ~/workspace/perso/wiki/wiki/index.wiki silent !cd ~/workspace/perso/wiki; git pull
  " After writing to any file in the wiki dir, add all files in the repo, commit and push
  au! BufWritePost ~/workspace/perso/wiki/* silent !cd ~/workspace/perso/wiki; git add -A;git commit -m "Autocommit and push";git push
augroup END


" Emoji Autocompletion
set completefunc=emoji#complete

" Coc & Jedi config
let g:jedi#use_splits_not_buffers = "bottom"

" Set Github Color Scheme
colorscheme github_light

" Automatically rebalance windows on vim resize
autocmd VimResized * :wincmd =

" Zoom a vim pane, <C-w>= to rebalance
nnoremap <leader>- :wincmd _<cr>:wincmd \|<cr>
nnoremap <leader>= :wincmd =<cr>

" Tune VTR to not mess up Python syntaxic whitespace
let g:VtrStripLeadingWhitespace = 0
let g:VtrClearEmptyLines = 0
let g:VtrAppendNewline = 1

" Update all buffers before navigating from Vim to tmux pane
let g:tmux_navigator_save_on_switch = 1

" Open a script runner attached to the current vim session
nnoremap <leader>osr :VtrOpenRunner {'orientation': 'h', 'percentage': 50}<cr>
nnoremap <leader>irb :VtrOpenRunner {'orientation': 'h', 'percentage': 50, 'cmd': 'irb'}<cr>
nnoremap <leader>ipy :VtrOpenRunner {'orientation': 'h', 'percentage': 50, 'cmd': 'ipython'}<cr>


" other VTR shortcuts
nnoremap <leader>sl :VtrSendLinesToRunner<cr>
nnoremap <leader>sd :VtrSendCtrlD<cr>
nnoremap <leader>sc :VtrSendCommandToRunner<cr>
