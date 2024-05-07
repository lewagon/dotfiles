-- import null-ls plugin safely
local setup, null_ls = pcall(require, "null-ls")
if not setup then
	return
end

-- for conciseness
local formatting = null_ls.builtins.formatting -- to setup formatters
local diagnostics = null_ls.builtins.diagnostics -- to setup linters

-- to setup format on save
vim.cmd([[
  augroup LspFormatting
    autocmd! * <buffer>
    autocmd BufWritePre *.apex,*.cls,*.trigger lua vim.lsp.buf.format({ async = true })
  augroup END
]])

-- configure null_ls
null_ls.setup({
	-- setup formatters & linters
	sources = {
		--  to disable file types use
		formatting.stylua, -- lua formatter
		formatting.rubocop, -- ruby formatter
		formatting.astyle, -- c/c++/java used for apex formatting
		diagnostics.eslint_d.with({ -- js/ts linter
			condition = function(utils)
				return utils.root_has_file(".eslintrc.js") -- change file extension if you use something elsenull
			end,
		}),
		null_ls.builtins.formatting.prettier.with({
			extra_filetypes = { "apex", "cls", "trigger" }, -- Ajoutez les types de fichiers Apex
		}),
		debug = true,
	},
	-- configure format on save
	on_attach = function(current_client, bufnr)
		if current_client.supports_method("textDocument/formatting") then
			vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
			vim.api.nvim_create_autocmd("BufWritePre", {
				group = augroup,
				buffer = bufnr,
				callback = function()
					vim.lsp.buf.format()
				end,
			})
		end
	end,
})
