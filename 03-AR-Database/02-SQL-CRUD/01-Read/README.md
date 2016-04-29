## Background & Objectives

You now know how to use `SQLite3::Database` instance to `execute` SQL queries
against a SQLite database:

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM stuff')
# => rows is an `Array` of row, each row being an `Array` of columns.
```

The goal of the day is to implement each one of the `CRUD` operations and build a copycat of
[Hacker News](https://news.ycombinator.com).

**Note**: in this exercise, we **give** you the `DB` global variable, so
no need to instantiate a new `SQLite3::Database`. Just use `DB.execute` in
your code, it'll work (have a look at `spec/models/post_spec.rb` to view how
the `DB` variable is created).

## Specs

In this first exercise, we focus on **R**ead (the `R` in `CRUD`).
Implement a class that will handle a `posts` table, defined as follow:

```sql
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);
```

### `initialize`

Add the `initialize` method to store in instance variables the columns
from the `posts` table defined above. Add relevant readers & accessors.

### `find`

Implement a **class** method `find(id)` on the `Post` class which takes
an integer as an argument (the post id) and will return an instance
of `Post`.

Assume there is a global variable `DB` defined in the program, no need for
you to instantiate it and care of the file where it is stored.

### `all`

Implement a **class** method `all` on the `Post` class which takes
no argument and will return an array of `Post` instances.

## Further suggestions

One spec will tell you about SQL injection. It's a type of attack where
the person using your application won't just pass a regular integer `id`
to the `find` method, but some evil string to damage your data. Look at
the SQL query generated from the spec, you'll see what you mean.

You should use [**bind parameters** with the `execute`](http://zetcode.com/db/sqliteruby/bind/)
method to avoid those injections and correctly **escape** value from the user.

**Never trust user data**!
