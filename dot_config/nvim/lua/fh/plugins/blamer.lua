local setup, blamer = pcall(require, "blamer")
if not setup then
	return
end

blamer.setup({
	enable = true,
	format = "%committer │ %committer-time-human │ %summary",
	time_format = "%H:%M",
	max_commit_length = 50,
	blamer_prefix = " ",
	delay = 500,
	enable_mappings = true,
	toggle_virtual_text = "<leader>gb",
	toggle_virtual_text_mode = "n",
	blame_line_custom_opts = {
		virt_text = true,
		virt_text_pos = "eol",
		delay = 500,
	},
	add_coauthor = "<leader>gc",
	add_coauthor_mode = "n",
	add_coauthor_prompt = "Coauthor: ",
	add_coauthor_confirm = "Add Coauthor",
	add_coauthor_cancel = "Cancel",
	add_coauthor_action = "add_coauthor",
})
