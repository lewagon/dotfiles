## Background & Objectives

Now it is time to use Ruby code to interact with the `jukebox` database from the previous exercise. The goal of this challenge is to communicate with the database **from our Ruby code**.

In this challenge, you'll be working in a ruby file, `lib/queries.rb`, where you'll have to complete several methods that gather specific data from the DB.

### Setup info

👉 **IMPORTANT**: Each method will take a `db` argument, which is an instance of `SQLite3::Database` on which you can call the `execute` method. This `db` is **built by the test and passed along to the method. There is no need to create one yourself in order to satisfy `rake`**. Your methods will look like this:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # results in an Array (rows) of Array (columns)
  p results  # Inspect what you get back! Don't guess!

  # Then you'll need to return something.
  return ?
end
```

👉 However, it's important to test your code!  If you want to try your code using `irb` or to be able to call your methods from within the `lib/queries.rb` file, you will need to build the `db` instance yourself:

```ruby
# lib/queries.rb
require "sqlite3"
db = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = db.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"]]
```

If you added the above code into your `lib/queries.rb` file and now want to try testing your code from `irb`, you can import and call your query methods with the following:

```ruby
require_relative "lib/queries"
artist_count(db)
# => [...]
```

If you're running your code from within `lib/queries.rb` only, you can call your methods and use `puts` or `p` to see your results as normal **after** instantiating your `db` as described above.

## Specs

Open the file `lib/queries.rb` to answer the following questions. Don't forget you can look inside the database by running `sqlite3 lib/db/jukebox.sqlite` in the Terminal or use the VS Code SQLite Extension mentioned in the previous exercise.

There are six methods to implement:

- How many rows does the `artists` table contain?
- How many rows does each table contain (generic method)?
- Return the list of all the artists and sort them by name (alphabetically). **Hint:** use the `ORDER BY` SQL filter.
- Find all the love songs (i.e the tracks that contain "love" **anywhere** in their name). **Hint:** use the `WHERE` and `LIKE` SQL keywords.
- Return all the tracks that are longer than a given duration and sort them. **Hint:** you can use the comparison operator `>` in SQL.
- Return a list of every artist with the number of albums they have, sorted alphabetically  **Hint:** you'll need to `JOIN` two tables, as well as using `GROUP BY` and  `ORDER BY`!

## Tips

SQL queries tend to get pretty long, especially when you start using `WHERE` or `JOIN`. In Ruby, you can use the [HEREDOC](https://www.rubyguides.com/2018/11/ruby-heredoc/) syntax to write **multi-line** strings:

```ruby
# Find the first 3 artists with the letter `Z` in their name.
query = <<~SQL
  SELECT *
  FROM artists
  WHERE name LIKE "%Z%"
  ORDER BY name
  LIMIT 3
SQL
rows = db.execute(query)
```

You'll notice that your text editor understands Heredoc and the syntax highlighting is actually SQL inside the Ruby file!

## Resources

* [SQL Commands](http://www.sqlcommands.net/)
* [Course in 🇫🇷 about `SELECT`](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## VS Code SQLite extension - Executing queries

This time we will be running the `SQLite: New Query` command. In order to do so, please follow these steps:

- Open your command palette with `Cmd / Ctrl` + `Shift` + `p`.
- Type in `SQLite: New Query`
- Write your query in the opened `.sql` file
- Once your query is ready open your command palette again and type in `SQLite: Run Query`
- Select the database you want to run your query on

And that's it! You should see your results!

<iframe src="https://player.vimeo.com/video/690525239?h=ca70e032e8" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

👉 You can find more information about the VS Code SQLite extension in our [dedicated cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/vs_code_sqlite_extension).
