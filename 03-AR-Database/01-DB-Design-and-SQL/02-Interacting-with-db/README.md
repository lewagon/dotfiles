## Background & Objectives

`Sqlite` is a simple database that rely on a standalone file.
You can read more on [en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite).
The goal of this first exercise is to use the command line to read and query
a sample database called `jukebox.sqlite` that we give you


### Setup

First test if you have sqlite3 installed on your computer:

```bash
$ sqlite3 --version
```

If you don't have it, you can `brew install sqlite` or `sudo apt-get install sqlite libsqlite3-dev` it.

You can open the database we provide you to make some queries on it with:

```bash
$ sqlite3 lib/db/jukebox.sqlite
```

You are in the interactive sqlite3 console and you can write your SQL queries to the database.
You can exit the sqlite3 console with `.quit` or `CTRL+D`.

If you are confused with the command line, you can download [SQLiteBrowser](http://sqlitebrowser.org)
and open the `jukebox.sqlite` file with it.

## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema.
Answer the following questions.

1. What is the database schema? (i.e what are the tables, and the relations between tables)
2. Use SQL Design tool to draw the schema of this database.
3. How many rows each table contains? What are the column names for each table?

Submit your SQL schema in XML format in `jukebox.xml`.

## Resources & Tips

- [http://zetcode.com/db/sqlite/tool/](http://zetcode.com/db/sqlite/tool/)

- **Tools**: You can also use a SQLite viewer to read the SQlite database and check your results.
  - [http://sourceforge.net/projects/sqlitebrowser/](http://sourceforge.net/projects/sqlitebrowser/)
  - [Sqlite Manager for Firefox](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/)
