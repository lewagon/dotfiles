if exists('g:autoloaded_copilot_log')
  finish
endif
let g:autoloaded_copilot_log = 1

if !exists('s:log_file')
  let s:log_file = tempname() . '-copilot.log'
  try
    call writefile([], s:log_file)
  catch
  endtry
endif

function! copilot#logger#File() abort
  return s:log_file
endfunction

function! copilot#logger#Raw(level, message) abort
  if $COPILOT_AGENT_VERBOSE !~# '^\%(1\|true\)$' && a:level < 1
    return
  endif
  let lines = type(a:message) == v:t_list ? copy(a:message) : split(a:message, "\n", 1)
  try
    if !filewritable(s:log_file)
      return
    endif
    call map(lines, { k, L -> type(L) == v:t_func ? call(L, []) : L })
    call writefile(lines, s:log_file, 'a')
  catch
  endtry
endfunction

function! copilot#logger#Trace(...) abort
  call copilot#logger#Raw(-1, a:000)
endfunction

function! copilot#logger#Debug(...) abort
  call copilot#logger#Raw(0, a:000)
endfunction

function! copilot#logger#Info(...) abort
  call copilot#logger#Raw(1, a:000)
endfunction

function! copilot#logger#Warn(...) abort
  call copilot#logger#Raw(2, a:000)
endfunction

function! copilot#logger#Error(...) abort
  call copilot#logger#Raw(3, a:000)
endfunction

function! copilot#logger#Exception() abort
  if !empty(v:exception)
    call copilot#logger#Error('Exception: ' . v:exception . ' @ ' . v:throwpoint)
    let agent = copilot#RunningAgent()
    if !empty(agent)
      if v:throwpoint =~# '[\/]'
        let throwpoint = '[redacted]'
      else
        let throwpoint = v:throwpoint
      endif
      call agent.Request('telemetry/exception', {
            \ 'origin': 'copilot.vim',
            \ 'stacktrace': v:exception . ' @ ' . throwpoint,
            \ })
    endif
  endif
endfunction
