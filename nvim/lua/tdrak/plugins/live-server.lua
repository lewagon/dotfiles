return {
	"barrett-ruth/live-server.nvim",
	-- build = "pnpm add -g live-server",
	cmd = { "LiveServerStart", "LiveServerStop" },
	keys = {
		{ "<leader>ps", "<cmd>LiveServerStart<CR>", desc = "Start live-server" },
		{ "<leader>px", "<cmd>LiveServerStop<CR>", desc = "Stop live-server" },
	},
	config = function()
		local live_server = require("live-server")

		live_server.setup()

		-- local keymap = vim.keymap -- for conciseness
		--
		-- keymap.set("n", "<leader>ps", "<cmd>LiveServertStart<CR>", { desc = "Start live server" })
		-- keymap.set("n", "<leader>px", "<cmd>LiveServerStop<CR>", { desc = "Stop live server" })
		-- set keymaps
		-- local keymap = vim.keymap -- for conciseness

		-- vim.keymap.set("n", "s", live_server.operator, { desc = "Substitute with motion" })
		-- vim.keymap.set("x", "s", live_server.LiveServertStart, { desc = "Substitute in visual mode" })
	end,
}
