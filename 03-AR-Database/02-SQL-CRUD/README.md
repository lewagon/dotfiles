## Background & Objectives

You now know how to use `SQLite3::Database` instance to `execute` SQL queries
against a SQLite database.

You also know about MVC architecture using a `Repository` class to store
into a CSV.

Today we'll combine the MVC approach with code in the model to store
directly into a SQLite database. No more CSV, no more `Repository` class.

## Specs

We want to build a [Hacker News](https://news.ycombinator.com) copycat. This
would be a simple MVC app, with one model, one controller and one view.

### Model

You should open `app/models/post.rb` file and implement some behavior,
verified via `rake`. We want to be able to perform basic CRUD operations:

#### Create

The `Post` initialize method should take a `Hash` as argument and populate
instance variables from it. Look at the `reset_db.rb` file to see which
columns we want the `Post` model to support.

```ruby
post = Post.new({ title: "Le Wagon", url: "http://www.lewagon.org" })
post.save
```

As you can see, you should implement a `save` instance method. You may
need to use [last_insert_row_id](http://www.rubydoc.info/github/luislavena/sqlite3-ruby/SQLite3/Database:last_insert_row_id)

#### Read

You should implement 2 **class** methods (do you remember? The one with `self` in
the method name).

```ruby
posts = Post.all     # Fetch all posts from the database
post = Post.find(1)  # Fetch the post of id 1 from the database
```

#### Update

The `save` instance method you implemented before should also update an existing post.

```ruby
existing_post = Post.find(1)
existing_post.title = "New title"
existing_post.save
```

#### Delete

Implement a `destroy` instance method on `Post` to delete the post from the database.

```ruby
post = Post.find(1)
post.destroy
Post.find(1)  # => nil
```

Skip the test about SQL injection for now, and implement the controller & view.

### Controller & View

Look at the `app.rb` file. That's the one you want to launch to test your app.
We provide you with the router code, so you just have to implement the controller
methods (+ the view methods of course!).

```bash
$ ruby app.rb
```

At any point, you can reset the database and remove all posts by running:

```bash
$ ruby reset_db.rb
```

### SQL Injection

There is a test talking about [SQL Injection](http://en.wikipedia.org/wiki/SQL_injection).
This is something to be aware of. **Never** trust user input, so use
[prepared statement](http://zetcode.com/db/sqliteruby/bind/) instead of executing queries
built by concatemation or interpolation of user inputs.


