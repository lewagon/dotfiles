# Getting Started with GitHub: A Worked Example

This guide walks you through using GitHub end-to-end — from cloning a repository to making changes, committing, pushing, and working with Claude Code. By the end, you'll have proven that your entire setup works and you'll know the daily workflow.

**Prerequisites:** Complete the [main setup guide](jamies-setup-guide.md) first.

---

## Table of Contents

1. [How GitHub Works (The Big Picture)](#how-github-works-the-big-picture)
2. [Clone Your First Repository](#clone-your-first-repository)
3. [Make a Change](#make-a-change)
4. [The Git Workflow: Status, Add, Commit, Push](#the-git-workflow-status-add-commit-push)
5. [Verify on GitHub](#verify-on-github)
6. [Try Claude Code](#try-claude-code)
7. [Create a New Repository from Scratch](#create-a-new-repository-from-scratch)
8. [Daily Workflow Summary](#daily-workflow-summary)

---

## How GitHub Works (The Big Picture)

Think of GitHub like Google Docs for code:

- **Repository (repo)** — A project folder that tracks all changes over time
- **Clone** — Download a copy of a repo to your computer
- **Commit** — Save a snapshot of your changes (like a checkpoint)
- **Push** — Upload your commits to GitHub so they're backed up and shareable
- **Pull** — Download the latest changes from GitHub to your computer

The key difference from Google Docs: changes don't sync automatically. You decide when to save (commit) and when to upload (push).

---

## Clone Your First Repository

You already cloned your dotfiles repo during setup. Let's use it as our worked example.

### Step 1: Navigate to Your Dotfiles

```bash
cd ~/code/$GITHUB_USERNAME/dotfiles
```

If `$GITHUB_USERNAME` isn't set, run this first:

```bash
export GITHUB_USERNAME=`gh api user | jq -r '.login'`
```

### Step 2: Open It in Cursor

```bash
cursor .
```

Cursor will open with your dotfiles project. You should see all the files in the sidebar.

---

## Make a Change

Let's make a small change to prove the workflow works.

### Step 1: Open the README

In Cursor, click on `README.md` in the sidebar to open it.

### Step 2: Edit the File

Add a line at the end of the file, something like:

```
Setup completed successfully!
```

### Step 3: Save the File

Press `Cmd + S` to save.

---

## The Git Workflow: Status, Add, Commit, Push

Now let's walk through the core Git workflow. Open the Terminal in Cursor (press `` Ctrl + ` ``) or use your regular Terminal.

### Step 1: Check What Changed

```bash
git status
```

You'll see something like:

```
modified:   README.md
```

This tells you which files have been changed since your last commit.

### Step 2: See the Actual Changes

```bash
git diff
```

This shows exactly what lines you added or removed. Lines starting with `+` are additions, `-` are removals. Press `q` to exit the diff view.

### Step 3: Stage Your Changes

"Staging" means telling Git which changes you want to include in your next commit:

```bash
git add README.md
```

Run `git status` again — the file should now appear in green under "Changes to be committed".

### Step 4: Commit Your Changes

A commit is a saved snapshot with a message describing what you did:

```bash
git commit -m "Test my setup - update README"
```

### Step 5: Push to GitHub

Upload your commit to GitHub:

```bash
git push
```

That's it! Your change is now on GitHub.

---

## Verify on GitHub

Let's confirm it worked:

```bash
gh browse
```

This opens your dotfiles repository in your browser. You should see your updated README with the change you just made.

You can also check the commit history:

```bash
gh browse -c
```

This shows the commits page — your "Test my setup" commit should be at the top.

---

## Try Claude Code

Now let's prove the AI workflow works too.

### Step 1: Open Claude Code

Press `Cmd + J` in Cursor to open Claude Code in the panel.

### Step 2: Ask Claude Something About Your Project

Try typing something like:

```
What files are in this repository and what do they do?
```

Claude will read your project files and explain them. This confirms that Claude Code is working and can see your project.

### Step 3: Ask Claude to Make a Change

Try something like:

```
Add a comment to the top of the aliases file explaining what it contains
```

Claude will propose changes. Review them, approve them, and you'll see the file update in real-time.

### Step 4: Commit Claude's Changes

If you're happy with what Claude did, you can commit it the same way:

```bash
git add aliases
git commit -m "Add comment to aliases file"
git push
```

Or even ask Claude to do it for you — try typing `/commit` in the Claude Code panel.

---

## Create a New Repository from Scratch

Let's create a brand new project to prove you can start from zero.

### Step 1: Create the Repo on GitHub

```bash
gh repo create my-first-project --public --clone
```

**What this does:**

- Creates a new public repository called "my-first-project" on your GitHub account
- Clones it to your computer automatically

### Step 2: Navigate Into It

```bash
cd my-first-project
```

### Step 3: Open in Cursor

```bash
cursor .
```

### Step 4: Create a File

In Cursor, create a new file called `README.md` and add some content:

```markdown
# My First Project

This is my first project created from the command line!
```

Save it with `Cmd + S`.

### Step 5: Commit and Push

```bash
git add README.md
git commit -m "Initial commit - add README"
git push -u origin main
```

The `-u origin main` flag is only needed on your first push — it tells Git where to push to. After this, just `git push` will work.

### Step 6: Verify

```bash
gh browse
```

Your new repository should appear on GitHub with your README displayed.

### Clean Up (Optional)

If this was just a test project, you can delete it:

```bash
cd ~/code
rm -rf my-first-project
gh repo delete my-first-project --yes
```

---

## Daily Workflow Summary

Here's the workflow you'll use day-to-day:

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `cd ~/code/your-project` | Navigate to your project |
| 2 | `cursor .` | Open it in Cursor |
| 3 | `Cmd+J` | Open Claude Code |
| 4 | Make changes | Edit files or ask Claude to help |
| 5 | `git status` | See what changed |
| 6 | `git add .` | Stage all changes |
| 7 | `git commit -m "description"` | Save a snapshot |
| 8 | `git push` | Upload to GitHub |

Or, even simpler: ask Claude Code to commit and push for you using `/commit`.

### Pulling Changes

If you work from multiple computers, always pull first:

```bash
git pull
```

This downloads any changes that were pushed from elsewhere.

---

## You're All Set!

You now know how to:

- Clone repos from GitHub
- Make changes and commit them
- Push your work to GitHub
- Use Claude Code to understand and modify projects
- Create new repos from scratch

This is the foundation of everything you'll do. The more you do it, the more natural it becomes.
