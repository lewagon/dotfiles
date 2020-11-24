## Background & Objectives

Now it is time to use ruby code to interact with the `jukebox` database. For that we need a gem called [sqlite3](http://rubygems.org/gems/sqlite3).

To install the gem on your computer, run this in the terminal:

```bash
gem install sqlite3
```

The goal of this challenge is to talk to the database **from our Ruby code**.

## Specs

👉 **IMPORTANT**: Each method takes a `db` argument, which is an instance of `SQLite3::Database` on which you can call the `execute` method. This `db` is **built by the test and passed along to the method**. No need to create one yourself to satisfy `rake`. Your method will look like this:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # results in an Array (rows) of Array (columns)
  p results  # Inspect what you get back! Don't guess!

  # Then you'll need to return something.
  return ?
end
```

👉 To try your code with `irb` (or in the `lib/queries.rb` file), you will need to build `db` yourself.

```ruby
# ➜ 03-Interacting-with-code git:(master) ✗  irb
require "sqlite3"
db = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = db.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"]]
```

Open the file `lib/queries.rb` to answer the following questions. Don't forget you can look inside the database by running `sqlite3 lib/db/jukebox.sqlite` in the Terminal or use one of the tools mentionned in the previous exercise (SQLite Pro, SQLStudio or SQLite Browser).

There are five methods to implement:

- How many rows does the `artists` table contain?
- How many rows does each table contain (generic method)?
- Return the list of all the artists and sort them by name (alphabetically). **Hint:** use the `ORDER BY` SQL filter.
- Find all the love songs (i.e the tracks that contain "love" **anywhere** in their name). **Hint:** use the `WHERE` and `LIKE` SQL keywords.
- Return all the tracks that are longer than a given duration and sort them. **Hint:** you can use the comparison operator `>` in SQL.

## Tips

SQL queries tend to get pretty long, especially when you start using `WHERE` or `JOIN`. In Ruby,
you can use the [HEREDOC](https://www.rubyguides.com/2018/11/ruby-heredoc/) syntax to write **multi-line** strings:

```ruby
# Find the first 3 artists with the letter `Z` in their name.
query = <<-SQL
  SELECT * FROM artists
  WHERE name LIKE "%Z%"
  ORDER BY name
  LIMIT 3
SQL
rows = db.execute(query)
```

You'll notice that Sublime Text understand Heredoc and the syntax highlighting is actually SQL inside the Ruby file!

## Resources

* [SQL Commands](http://www.sqlcommands.net/)
* [Course in 🇫🇷 about `SELECT`](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## Tools

You were introduced to those tools in the previous exercise. Use them!

- [SQLite Pro (macOS only, paying but trial seems unlimited)](https://www.sqlitepro.com/)
- [SQLStudio (Free)](http://sqlitestudio.pl/)
- [SQLite Browser (Free)](http://sqlitebrowser.org/)
