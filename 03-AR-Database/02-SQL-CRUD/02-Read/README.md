## Background & Objectives

The goal of the day is to implement each one of the `CRUD` operations and build a copycat of [Hacker News](https://news.ycombinator.com).

**Note**: in this exercise, we **give** you the `DB` global variable, so no need to instantiate a new `SQLite3::Database` yourself. Just use `DB.execute` in your code, it'll work (have a look at `spec/models/post_spec.rb` to view how the `DB` variable is created).

## Tests

We prepared for you a `test.rb` file where the `DB` global variable is created the same way as in `spec/models/post_spec.rb`. Feel free to use this file to test your methods.

## Specs

In this first exercise, we focus on **R**ead (the `R` in `CRUD`). Implement a class that will handle a `posts` table, defined as follows:

```sql
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);
```

### `initialize`

Add the `initialize` method to store the above columns in instance variables. Add relevant readers & accessors.

### `find`

Implement a **class** method `find(id)` on the `Post` class that takes an integer as an argument (the post id) and returns an instance of `Post`.

(Assume there is a global variable `DB` defined in the program, no need for you to instantiate it)

We want you to protect the `find` method against **SQL injections**. 

SQL injection is a serious security issue, where an attacker can interfere with your application by means of malicious queries to the database. Potential effects are, for example, allowing an ill intended user to view restricted data (social security numbers, credit cards, passwords). This can be data from multiple users or any other type of data available to the application. In some cases, the attacker can change or delete data, permanently damaging the application.

To protect your database against SQL injections, you must never interpolate SQL queries with user data but use `?` [placeholders](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) instead. 

For this exercise, you might need to pass several arguments to the `.execute` method.

### `all`

Implement a **class** method `all` on the `Post` class which takes no argument and will return an array containing every `Post` instance.

## Further suggestions

An SQL injection is a type of attack where the person using your application won't just pass a regular integer `id` to the `find` method, but will add an evil string to damage your data. If you look at the SQL query in the spec, you'll see what we mean.

You can read [this Medium article](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9) and [this StackOverflow answer](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) to wrap your head around SQL injections 👌

If you wish to see SQL Injections in action, [hack this bank](https://www.hacksplaining.com/exercises/sql-injection#/start) and you'll get the picture!

**Never trust user data**!
