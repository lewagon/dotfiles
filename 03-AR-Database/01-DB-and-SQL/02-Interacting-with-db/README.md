## Background & Objectives

SQLite is a simple database that relies on a standalone file. If you're interested, you can read more [here](http://en.wikipedia.org/wiki/SQLite).

The goal of this exercise is to use the command line or a database tool to read and query a sample database called `jukebox.sqlite` that we have given you. To complete the challenge, draw the DB schema on [db.lewagon.com](http://db.lewagon.com/), save it as an XML file and run `rake`!

### Setup

You should already have [SQLite](https://sqlite.org/index.html) installed on your computer. Check it with:

```bash
sqlite3 -version
# You should see your sqlite version here
```

If you don't have it installed, you can do so by running the following in the terminal:

```bash
gem install sqlite3
```

You can then open the database we provided by running:

```bash
sqlite3 lib/db/jukebox.sqlite
```

You are now in the interactive `sqlite3` console and you can write your SQL queries to the database. You can exit the `sqlite3` console with `.quit` or `Ctrl + D`.

## Tools

You can also use the [VS Code SQLite extension](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) to read the SQLite database, explore the schema and even **run SQL queries**. This extension should've already been installed on setup day. If you don't have it, you can always go back to the [macOS](https://github.com/lewagon/setup/blob/master/macos.md#vscode_extensions), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#vscode_extensions) or [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#vscode_extensions) section of the setup.

### VS Code SQLite extension - Exploring the database

There are different commands you can use with this extension to explore and interact with your sqlite database. To start typing commands remember to open your command palette by pressing `Cmd / Ctrl` + `Shift` + `p`. You should see a little text box in your editor where you can type any command you want. To explore the database, we are going to run the `Open Database` command by following these steps:

- Open your command palette with `Cmd / Ctrl` + `Shift` + `p`.
- Type in `SQLite: Open Database`
- Click on the database path pointing to your database

You should see the `SQL EXPLORER` tab with your database loaded! Now you can open your database and explore all the existing tables! You can also click on the `triangle icon` to have a more visual representation of your tables 🙌 Try it on the `tracks` table!

<iframe src="https://player.vimeo.com/video/690525143?h=75949ff5a2" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema. Answer the following questions:
- What is the database schema? (i.e what are the tables, and the relations between tables)
- Use SQL Design tool to draw the schema of this database.
- How many rows does each table contain? What are the column names for each table?

Use [db.lewagon.com](http://db.lewagon.com/) to draw the Jukebox schema. Save it in XML format to `jukebox.xml` and check it with `rake`.
