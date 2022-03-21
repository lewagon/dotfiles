## Background & Objectives

SQLite is a simple database that relies on a standalone file. You can read more on [en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite).

The goal of this first exercise is to use the command line to read and query a sample database called `jukebox.sqlite` that we give you.

To complete the challenge, draw the DB schema on [db.lewagon.com](http://db.lewagon.com/), save it as an XML file and run `rake`!

### Setup

First test just to see if you have `sqlite3` installed on your computer:

```bash
sqlite3 --version
```

If you don't have it, you can install it by running:
- macOS: `brew install sqlite`
- Ubuntu: `sudo apt-get install sqlite3 libsqlite3-dev`

You can open the database we provided by running:

```bash
sqlite3 lib/db/jukebox.sqlite
```

You are now in the interactive `sqlite3` console and you can write your SQL queries to the database. You can exit the `sqlite3` console with `.quit` or `Ctrl + D`.

## Tools

You can also use the **[SQLite Extension](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)** to read the SQLite database, explore the schema and even **run SQL queries**.


### SQLite Extension Tutorial

You should already have [SQLite](https://sqlite.org/index.html) installed. Check it with:

```bash
  sqlite3 -version
# You should see your sqlite version here
```

If not, go back to the dedicated section of the [macOS](https://github.com/lewagon/setup/blob/master/macos.md#sqlite), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#sqlite) or [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#sqlite) or  setup.


There a different commands you can use with this extensions to explore, and interact with your sqlite database.  To start typing commands remember to open your command pallet by pressing `cmd` + `shift` + `p`, or `ctrl` + `shift` + `p` if you're working with windows. You should see a little text box in your editor where you can type any command you want.

To explore the database, we are going to run the `Open Database` command. Go ahead and open your command pallet and type `>SQLite: OpenDatabase` and click it or press enter (Note`>` leading character). Then you will be prompted to `select a database`. Click on the jukebox database which will be the one used for this challenge. As soon as you select it, you will see that your left navigation bar changed a little. Now we have the `SQLITE EXPLORER` tab! You can now open your database and explore all the existing tables! You can also click on the `triangle icon` to have a more visual representation of your tables :raised_hands: Try it on the `tracks` table!

## TODO: Upload sqlite_explore_database video to vimeo and embed here



## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema. Answer the following questions:
- What is the database schema? (i.e what are the tables, and the relations between tables)
- Use SQL Design tool to draw the schema of this database.
- How many rows does each table contain? What are the column names for each table?

Use [db.lewagon.com](http://db.lewagon.com/) to draw the Jukebox schema. Save it in XML format to `jukebox.xml` and check it with `rake`.
