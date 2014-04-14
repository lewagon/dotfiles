## Background & Objectives

`Sqlite` is a simple database that can be used as a standalone file. If you want more information: [http://en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite). The goal of this first exercise is to use the command line to read and query a sample database called `jukebox.sqlite`

#### Setup
* Open your terminal/console
* Go to the exercice folder with `$ cd lib/`
* Test if you have sqlite3 installed on your computer with `$ sqlite3 -version`. If not you can download it here [http://www.sqlite.org/download.html](http://www.sqlite.org/download.html) and follow the instructions to install it.
   
* You can open the database with:

```bash
sqlite3 db/jukebox.sqlite
```

* Then you are in the interactive sqlite3 console and you can write your queries to the database.
* You can exit the sqlite3 console with `.quit`
	
## Specs

The goal of this exercise is to explore the Jukebox database, and understand its scheme.
Answer the following questions (the resource links and tools can be helpful!)

1. What is the scheme of the database? (i.e what are the tables, and the relations between tables)
2. Use SQL Design to draw the scheme of this database.
3. How many rows each table contains? What are the column names for each table?

Submit your SQL scheme in XML format in `jukebox.xml`.

## Resources & Tips

- [http://zetcode.com/db/sqlite/tool/](http://zetcode.com/db/sqlite/tool/)

- **Tools**: You can also use a SQLite viewer to read the SQlite database and check your results.
  - [http://sourceforge.net/projects/sqlitebrowser/](http://sourceforge.net/projects/sqlitebrowser/)
  - [Sqlite Manager for Firefox](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/)
	


