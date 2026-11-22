# Dotfiles

Personal dev environment, managed with [chezmoi](https://www.chezmoi.io/). `home/` is the source
root (set by `.chezmoiroot`); the repo is expected at `~/Developer/personal/dotfiles`.

## Setup

### New machine

1. `xcode-select --install` (if prompted).
2. Install Homebrew:
   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Clone to the expected path, then install chezmoi and apply:
   ```sh
   git clone https://github.com/Y-O-W/dotfiles.git ~/Developer/personal/dotfiles
   brew install chezmoi
   chezmoi init --apply --source ~/Developer/personal/dotfiles
   ```
   You're prompted once for your 42 login and email, your personal email and your Muhlert Digital
   email. They're stored in `~/.config/chezmoi/chezmoi.toml` and rendered into `.vimrc`,
   `.gitconfig` and `.gitconfig-muhlert`, never committed.
4. Do the [manual steps](#manual-steps).

`apply` writes the dotfiles, installs oh-my-zsh and its plugins, runs `brew bundle` on
`~/.Brewfile` (moving `postgresql@17` to port 5433), and installs the pinned Ruby via rbenv.

### Existing machine

```sh
cd ~/Developer/personal/dotfiles
bin/sync-dotfiles.sh          # 1. report local drift (changes nothing)
bin/sync-dotfiles.sh <path>…  # 2. pull the drift you want to keep (or --all)
git diff                      # 3. review, then commit and push yourself
git pull --rebase && chezmoi apply   # 4. take changes from other machines
```

- Run the sync script before starting work: edits made directly on a target (`~/.zshrc`,
  `~/.claude/settings.json`) are lost on restore unless pulled into the source.
- JSON files an app rewrites in its own key order (`settings.json`) are compared as data;
  order-only drift is ignored.
- "config file template has changed" warning: run `chezmoi init`. The template sets `sourceDir`,
  so the config keeps pointing at this repo.
- After `brew install`/`uninstall`: `brew bundle dump --file="$HOME/.Brewfile" --force`, then
  `bin/sync-dotfiles.sh ~/.Brewfile`.

### Manual steps

- `ssh-add --apple-use-keychain ~/.ssh/id_ed25519` (the private key is not in this repo).
- `gh auth login` (needed by the git credential helper and `$GITHUB_USERNAME` in `.zshrc`).
- Mac App Store apps and Rosetta are out of scope.

## What's managed

| Source (under `home/`) | Target |
|---|---|
| `dot_zshrc`, `dot_zprofile`, `dot_aliases` | shell config, login env, aliases |
| `dot_gitconfig.tmpl`, `dot_gitconfig-muhlert.tmpl`, `dot_gitignore_global` | git config, per-org commit email for `~/Developer/work/muhlertdigitalgmbh/` via `includeIf` (emails from chezmoi data), global ignore |
| `dot_git-hooks/executable_strip-ai-trailers` | Global `commit-msg` hook that strips AI co-author trailers, registered in `dot_gitconfig.tmpl`, see [Git hooks](#git-hooks) |
| `dot_irbrc`, `dot_pryrc`, `dot_rspec` | IRB, Pry, RSpec |
| `dot_vimrc.tmpl`, `dot_vim/plugin/stdheader.vim` | Vim (42 Norm) and 42 header plugin; login/email from chezmoi data |
| `dot_Brewfile`, `dot_ruby-version` | Homebrew snapshot, pinned rbenv Ruby |
| `private_dot_ssh/private_config` | `~/.ssh/config` (0600) |
| `private_dot_claude/` | `~/.claude/` settings, hook, and custom skills |
| `private_Library/…/Code/User/settings.json` | VS Code settings |
| `dot_rails-templates/rails_new.rb` | Rails template used by the `rails-new` alias |
| `.chezmoiscripts/` | oh-my-zsh (once), `brew bundle`, Ruby and brand-tokens gems (on change) |
| `.chezmoiexternal.toml` | Externals: the `brand-tokens` skill, cloned at a pinned tag |

Outside `home/` and not managed: `bin/`, `vendor/`, `README.md`, `LICENSE`.
Untracked on purpose: `~/.claude/skills/synced/`, `~/.claude/plugins/synced/` (Claude's own caches),
and runtime state in `~/.claude/` (`projects/`, `cache/`, `history.jsonl`, …).
`home/.chezmoiignore` skips `.DS_Store` and `__pycache__`.

### Git hooks

A config-based hook (git >= 2.54) in `home/dot_gitconfig.tmpl` runs `~/.git-hooks/strip-ai-trailers`
(`home/dot_git-hooks/executable_strip-ai-trailers`) on every `commit-msg`:

```gitconfig
[hook "strip-ai-trailers"]
	event = commit-msg
	command = ~/.git-hooks/strip-ai-trailers
```

It strips `Co-Authored-By:` lines that mention Claude or Anthropic, and "Generated with Claude"
lines. Human co-authors are kept. Claude Code's `attribution.commit = ""` only changes what the
model is offered; it does not scrub a message the model writes itself, so this is the enforcement
for every tool that commits.

Why not `core.hooksPath`: it *replaces* a repo's `.git/hooks` instead of adding to it, which needs a
dispatcher and a symlink per hook name to keep repo hooks working. Config-based hooks run in
addition to the repo's own hooks, so `core.hooksPath` stays unset and nothing needs chaining.

Limits: needs git >= 2.54 (an older git ignores the `[hook]` section silently),
`git commit --no-verify` skips it, and only new commits are affected. To add another global hook,
add a script under `home/dot_git-hooks/` and another `[hook "<name>"]` block with its `event`.

### Skills

Every personal skill and hook lives here, as plain tracked copies deployed by `chezmoi apply`.
Claude Desktop uploads and the `synced/` cache are derived copies, not backups. Vendored
third-party skills (`kepano/obsidian-skills`) have their provenance pinned in
`vendor/kepano-obsidian-skills/UPSTREAM.md`.

One exception: **`brand-tokens` is an external, not a tracked copy.** `home/.chezmoiexternal.toml`
clones `github.com/Y-O-W/brand` into `~/.claude/skills/brand-tokens`, pinned to a release tag;
that repo is its home. Don't `chezmoi add` it or edit it in place. To upgrade, change the tag (twice)
in `.chezmoiexternal.toml` and run `chezmoi apply --refresh-externals`; the
`run_onchange_after_30-brand-tokens-gems.sh` script then installs the skill's gems.

To find skills that exist only on the Claude account:

```sh
cd ~/.claude/skills/skill-creator-plus
python3 -m scripts.check_skill_backup             # flag skills with no pushed home
python3 -m scripts.check_skill_backup --harvest   # also copy account-only skills out of Desktop's cache
```

## Dev versions

- `bin/update-dev-versions.sh` bumps Ruby to the latest patch of the pinned minor line, upgrades
  Brewfile packages, refreshes the snapshot, applies it and commits (never pushes).
- It only reports, never applies: Ruby minor/major bumps, PostgreSQL major bumps (need
  `pg_upgrade` or dump/restore), and Rails (pinned per project).
- **New apps** use Ruby `4.0.6` (global pin; existing apps keep their own `.ruby-version`) and
  PostgreSQL 17 on port 5433, alongside `postgresql@15` on 5432. `rails-new my_app` expands to
  `rails new -d postgresql -m ~/.rails-templates/rails_new.rb`, which sets `port: 5433`.

### Dev server ports

| Tool | Port | Notes |
|---|---|---|
| Rails (Puma) | 3000 | default |
| Next.js | 3001 | overridden (default 3000 clashes with Rails): `next dev -p 3001` |
| Vite | 5173 | default |
| Django | 8000 | default |
| Flask | 5000 | default; AirPlay Receiver may hold it, falls back to 5001 |
| Vue CLI / Webpack | 8080 | default |
| Angular CLI | 4200 | default |
| PostgreSQL | 5432 (`@15`), 5433 (`@17`) | |
| Redis | 6379 | default |

## Commands

| Command | What it does |
|---|---|
| `chezmoi edit <file>` / `chezmoi cd` | edit the source, then `chezmoi apply` |
| `chezmoi diff` | preview changes |
| `chezmoi apply` | write source to `$HOME` |
| `chezmoi update` | `git pull` and apply |
| `chezmoi status` | managed files that differ from source |
| `chezmoi unmanaged <path>…` | untracked files under a path (never run without a path) |
| `bin/sync-dotfiles.sh [<path>… \| --all]` | report or pull local drift |

## Fork notes

Personal fork of [`lewagon/dotfiles`](https://github.com/lewagon/dotfiles); `origin` is
`Y-O-W/dotfiles`, `upstream` is the Le Wagon repo.

- Up to date with `upstream/master` as of 2026-09-28 (last upstream commit 2025-12-02).
- Moved from a hand-rolled `install.sh` to chezmoi on 2026-07-14. The old install scripts and
  loose root-level config files are retired.
- Now covers the whole dev environment: Homebrew, rbenv/Ruby, VS Code, SSH, and Claude Code
  config, skills and hooks.
- Chezmoi gotchas: a bare `run_` prefix in the source tree is treated as a script (use
  `literal_`), and zero-byte files are dropped unless prefixed `empty_`.
- The locally modified `skill-creator` was retired in favour of `skill-creator-plus`; it remains
  in git history.
