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

- macOS: `brew install sqlite`
- Ubuntu: `sudo apt-get install sqlite3 libsqlite3-dev`

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

### Windows

Copy the following commands in your Ubuntu terminal one line at a time:
```bash
sudo apt update
sudo apt install -y sqlitebrowser
echo "export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" >> ~/.zshrc
source ~/.zshrc
```

Install [Xming](https://sourceforge.net/projects/xming/) (Untick `Start Xming` at the end of the installer).


Start XLaunch, leaving default settings but **add the following optional parameters** `-ac`.

![xlaunch](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/xlaunch.jpg)

You can open your DB with:
```bash
cd ~/code/your-github-username/fullstack-challenges/03-AR-Database/01-DB-Design-and-SQL/03-Interacting-with-db
sqlitebrowser lib/db/jukebox.sqlite
```

If you get the error `could not initialize SDL` when opening your DB, you need to add an exception in your Windows Defender to allow Xming public incomming traffic over UDP and TCP protocols. You can follow this [documentation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule).



❓Should I use the command-line `sqlite3` or one of the visual tool above? Well, both are useful! It's good to learn a bit to manipulate the command line for two reasons. On the one hand, a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) allows you to focus on the SQL queries. On the other hand, a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) tool will prove helpful to explore a database schema structure (tables? columns? etc.). Try both!

## Specs

The goal of this exercise is to explore the Jukebox database, and understand its schema. Answer the following questions:

- What is the database schema? (i.e what are the tables, and the relations between tables)
- Use SQL Design tool to draw the schema of this database.
- How many rows does each table contain? What are the column names for each table?

Use [db.lewagon.com](http://db.lewagon.com/) to draw the Jukebox schema. Save it in XML format to `jukebox.xml` and check it with `rake`.
