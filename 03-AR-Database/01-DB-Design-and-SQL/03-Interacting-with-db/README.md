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

You can also use a **SQLite viewer** application to read the SQLite database, explore the schema and even **run SQL queries**.

- [SQLite Pro (macOS only, paying but trial seems unlimited)](https://www.sqlitepro.com/)
- [SQLite Browser (Free, macOS only)](http://sqlitebrowser.org/)
- [SQLite Online (Free)](https://sqliteonline.com/)
- [SQLStudio (Free)](http://sqlitestudio.pl/)

### Windows

Go to [SQLStudio](http://sqlitestudio.pl/) and download their Windows version.
Unzip all the files and double-click on SQLiteStudio to open the application.

It will ask you which database you want to open but it won't be able to open the one you have in the WSL filesystem so we first need to copy the db file over to your Windows filesystem.

You can either:

Run `cp lib/db/jukebox.sqlite /mnt/c/Users/<your Windows username>/Downloads/`.

Or do it the manual way by typing `explorer.exe .` in your command line to open a file explorer windows. Then locate the database file by opening the `lib` and `db` folder and copy the `jukebox.sqlite` database file.
Head to a folder inside your Windows filesystem and paste the database file there. We recommend you to create a folder `databases` in your `Documents` for instance, so you can store future sqlite databases there too.

Now go back to SQLStudio and select the database file you just copied (in your `Documents/databases` folder in our example), and click on `Open`.

Last step, click on `Database` on the top bar and `Connect to the database` to open the connection with it.
You can now visualise all the tables within it or query it by going to `Tools` and `Open SQL Editor`. Happy querying!


❓Should I use the command-line `sqlite3` or one of the visual tool above? Well, both are useful! It's good to learn a bit to manipulate the command line for two reasons. On the one hand, a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) allows you to focus on the SQL queries. On the other hand, a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) tool will prove helpful to explore a database schema structure (tables? columns? etc.). Try both!

## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema. Answer the following questions:
- What is the database schema? (i.e what are the tables, and the relations between tables)
- Use SQL Design tool to draw the schema of this database.
- How many rows does each table contain? What are the column names for each table?

Use [db.lewagon.com](http://db.lewagon.com/) to draw the Jukebox schema. Save it in XML format to `jukebox.xml` and check it with `rake`.
