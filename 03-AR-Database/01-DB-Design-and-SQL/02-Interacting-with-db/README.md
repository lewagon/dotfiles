## Background & Objectives

`Sqlite` is a simple database that relies on a standalone file.
You can read more on [en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite).

The goal of this first exercise is to use the command line to read and query
a sample database called `jukebox.sqlite` that we give you

### Setup

First test just to see if you have sqlite3 installed on your computer:

```bash
sqlite3 --version
```

If you don't have it, you can install it by running:

- Mac: `brew install sqlite`
- Ubuntu: `sudo apt-get install sqlite libsqlite3-dev`

You can open the database we provided you to make some queries on it:

```bash
sqlite3 lib/db/jukebox.sqlite
```

You are now in the interactive sqlite3 console and you can write your SQL queries to the database.
You can exit the sqlite3 console with `.quit` or `CTRL+D`.

## Tools

You can also use a **SQLite viewer** application to read the SQLite database, explore the schema and even **run SQL queries**.

- [SQLite Pro (macOS only, paying but trial seems unlimited)](https://www.sqlitepro.com/)
- [SQLStudio (Free)](http://sqlitestudio.pl/)
- [SQLite Browser (Free)](http://sqlitebrowser.org/)

❓Should I use the command-line `sqlite3` or one of the visual tool above? Well, both are useful! It's good to learn a bit to manipulate the command line for two reasons. On the one hand, a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) allows you to focus on the SQL queries. On the other hand, a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) tool will prove helpful to explore a database schema structure (tables? columns? etc.). Try both!

## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema. Answer the following questions:

- What is the database schema? (i.e what are the tables, and the relations between tables)
- Use SQL Design tool to draw the schema of this database.
- How many rows does each table contain? What are the column names for each table?

Use [db.lewagon.com](http://db.lewagon.com/) to draw the Jukebox schema. Save it in XML format to `jukebox.xml` and check it with `rake`.
