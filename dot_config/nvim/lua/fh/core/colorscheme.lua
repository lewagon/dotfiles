local status, _ = pcall(vim.cmd("colorscheme nightfly"))

if not status then
	return
end
