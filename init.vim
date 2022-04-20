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
Plug 'Vimjas/vim-python-pep8-indent'
Plug 'dense-analysis/ale'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
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
Plug 'fladson/vim-kitty'
call plug#end()

" Config Section
set number
set nocompatible
filetype plugin on
syntax on

au BufNewFile,BufRead *.py \
  set foldmethod=indent

let g:ale_linters = {
      \   'python': ['flake8', 'pylint'],
      \   'ruby': ['standardrb', 'rubocop'],
      \   'javascript': ['eslint'],
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
