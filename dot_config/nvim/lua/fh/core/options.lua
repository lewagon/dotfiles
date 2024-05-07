local opt = vim.opt -- for conciseness

-- line number
opt.relativenumber = true
opt.number = true

-- tabs & indentation
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true

-- line wrapping
opt.wrap = false

-- search settings
opt.ignorecase = true
opt.smartcase = true

-- cursor line
opt.cursorline = true

-- appearance
opt.termguicolors = true
opt.background = "dark"
opt.signcolumn = "yes"

-- backspace
opt.backspace = "indent,eol,start"

-- clipboard
opt.clipboard:append({ "unnamed", "unnamedplus" })

-- split windows
opt.splitright = true
opt.splitbelow = true

-- code folding
opt.foldmethod = "indent"
opt.foldlevel = 99

opt.iskeyword:append("-")
