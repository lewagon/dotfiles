## Background & Objectives

You now know how to use the `SQLite3::Database` instance to `execute` SQL queries against a SQLite database:

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM table_name')
# => rows is an Array of records, each record being an Array of columns.
```

Before moving on to the main goal for today, let's do a small warmup and rehearse making a query to the database. We will be using the same `jukebox` database from yesterday's exercises before moving on to a different one in the second exercise.

## Specs

We prepared for you a `query.rb` file with one method: `all_artists`. This method should use the `db` passed as an argument to retrieve all the records (all fields) in the artists table.
