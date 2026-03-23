# Jamie's Rails Development Setup Guide

This guide adds Ruby on Rails development tools on top of your base Mac setup. **Complete the [main setup guide](jamies-setup-guide.md) first** — you'll need Homebrew, Ruby (via rbenv), and Node.js installed before starting here.

---

## Table of Contents

1. [Prerequisites Check](#prerequisites-check)
2. [Additional Homebrew Packages](#additional-homebrew-packages)
3. [Ruby Gems](#ruby-gems)
4. [Yarn (JavaScript Package Manager)](#yarn-javascript-package-manager)
5. [SQLite](#sqlite)
6. [Verification](#verification)

---

## Prerequisites Check

Make sure these are working before continuing:

```bash
ruby -v
```

Should show: `ruby 3.3.x`

```bash
node -v
```

Should show: `v20.x.x`

If either is missing, go back to the [main setup guide](jamies-setup-guide.md) and complete the Ruby and Node.js sections.

---

## Additional Homebrew Packages

Rails needs a few extra tools. Copy-paste each command one at a time:

```bash
brew upgrade imagemagick || brew install imagemagick
```

```bash
brew upgrade openssl || brew install openssl
```

**What these tools do:**

- `imagemagick` — Image processing library (resizing, converting images in your app)
- `openssl` — Encryption library (needed for secure connections)

---

## Ruby Gems

Gems are Ruby libraries — packages of code you can download and use. Let's install the ones needed for Rails development.

### Step 1: Update Bundler

Bundler manages gem dependencies for your projects:

```bash
gem update bundler
```

### Step 2: Install Rails and Essential Gems

```bash
gem install colored faker http pry-byebug rake rails rest-client rspec rubocop-performance sqlite3 activerecord ruby-lsp
```

**What will happen:**

- This installs many gems at once — it may take a few minutes
- You should see `xx gems installed` at the end

**What the key gems do:**

- `rails` — The Ruby on Rails web framework
- `rspec` — Testing framework
- `rubocop-performance` — Code style checker
- `pry-byebug` — Debugging tool (pause your code and inspect it)
- `sqlite3` — Database adapter for SQLite
- `ruby-lsp` — Language server for better editor support
- `faker` — Generates fake data for testing (names, emails, etc.)

**If you get an error** about "incompatible marshal file format":

```bash
rm -rf ~/.gemrc
```

Then run the gem install command again.

**Important:** Never use `sudo gem install` — if you see advice suggesting this, something else is wrong.

---

## Yarn (JavaScript Package Manager)

Rails uses Yarn to manage JavaScript dependencies (CSS frameworks, JavaScript libraries, etc.):

```bash
corepack enable
yarn set version stable
```

If you see any errors, try running `npm install -g corepack` first, then run the commands above again.

```bash
exec zsh
```

### Verify Yarn is Installed

```bash
yarn -v
```

You should see a version number.

---

## SQLite

SQLite is a lightweight database that's great for local development. Rails uses it by default for new projects.

```bash
brew install sqlite
```

### Verify SQLite is Installed

```bash
sqlite3 -version
```

You should see a version number.

---

## Verification

Let's make sure everything is ready for Rails development:

```bash
rails -v
```

Should show: `Rails 8.x.x` (or similar)

```bash
sqlite3 -version
```

Should show a version number

```bash
yarn -v
```

Should show a version number

### Create a Test Project

The best way to verify everything works is to create a quick Rails app:

```bash
cd ~/code
rails new test-app --skip-git
cd test-app
rails server
```

Open your browser to `http://localhost:3000` — you should see the Rails welcome page.

When you're done, press `Ctrl + C` in the terminal to stop the server, then clean up:

```bash
cd ~/code
rm -rf test-app
```

---

## You're Ready!

Your Mac is now set up for Rails development on top of your AI-first Cursor + Claude Code workflow. You have:

- Rails framework and essential gems
- SQLite for local databases (PostgreSQL too, if you set it up in the main guide)
- Yarn for JavaScript dependencies
- Image processing support with ImageMagick
