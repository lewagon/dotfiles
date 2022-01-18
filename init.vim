" Plugin Section
call plug#begin("~/.vim/plugged")
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
Plug 'davidhalter/jedi'
Plug 'dart-lang/dart-vim-plugin'
Plug 'vimwiki/vimwiki'
Plug 'mattn/calendar-vim'
Plug 'Alok/notational-fzf-vim'
Plug 'ferrine/md-img-paste.vim'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'numirias/semshi', { 'do': ':UpdateRemotePlugins', 'for': 'python' }
call plug#end()

" Config Section
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

let g:nv_search_paths = ['~/workspace/xavierosee/notes','~/workspace/xavierosee/wiki', './notes.md', './doc', './notes']
let g:nv_main_directory = '~/workspace/xavierosee/notes'
let g:vimwiki_list = [{'path':'~/workspace/xavierosee/wiki/wiki', 'path_html':'~/workspace/xavierosee/wiki/docs'}]
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
nmap <silent> <leader>ts "=strftime("%c")<CR>P


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
  " Make sure this window's working dir is the wiki repo dir whenever home.md is opened
  au! BufRead ~/workspace/xavierosee/wiki/wiki/index.wiki lcd ~/workspace/xavierosee/wiki
  " Also do a git pull whenever home.md is opened
  au BufRead ~/workspace/xavierosee/wiki/wiki/index.wiki !git pull
  " After writing to any file in the wiki dir, add all files in the repo, commit and push
  au! BufWritePost ~/workspace/xavierosee/wiki/wiki/* !git add .;git commit -m "Autocommit and push";git push
augroup END
