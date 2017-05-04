## Background & Objectives

Now it is time to use ruby code to interact with the `jukebox` database. For that we use a gem called [sqlite3](http://rubygems.org/gems/sqlite3).

To install the gem on your computer, run this in the terminal:

```bash
gem install sqlite3
```

The goal of this challenge is to query the database **from Ruby code**.

## Specs

Each method take a `db` argument, which is an instance of `SQLite3::Database` on which you can call the `execute` method. Thus your method will look like this:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # results in an Array (rows) of Array (columns)
  p results  # Inspect what you get back! Don't guess!

  # Then you'll need to return something.
  return ?
end
```

Complete the program `queries.rb` to answer the following questions. Don't forget you can look inside the database by running `sqlite3 lib/db/jukebox.sqlite` in the Terminal.

1. How many rows contains each table?
2. Return the list of all the artists and sort them by name (alphabetical order). **Hint:** use the `ORDER BY` SQL filter.
3. Find all the love songs (i.e the tracks that contain "love" in their name). **Hint:** use the `WHERE` and `LIKE` SQL keywords.
4. Return all the tracks that are longer than 10 minutes and sort them by length. **Hint:** you can use the comparison operator `>` in SQL.

## Resources

* [**Great 101 on Ruby/Sqlite3**](http://sqlite-ruby.rubyforge.org/sqlite3/faq.html)
* [SQL Commands](http://www.sqlcommands.net/)
* [Course in 🇫🇷 about `SELECT`](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## Tools

You can also use a **SQLite viewer** application to read the SQLite database, explore the schema and even **run SQL queries**.

- [SQLStudio (Free)](http://sqlitestudio.pl/?act=download)
- [SQLite Browser (Free)](http://sqlitebrowser.org/)
- [SQLite Pro (Paying, 7 days trial)](https://www.sqlitepro.com/)
