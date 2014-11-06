## Background & Objectives

In the previous exercices, we carefully built method directly into our
model class, `Post`. This way, we don't need any `Repository` class like
when we were storing data into a CSV, the model class handles directly
the relation with the database. Great isn't it?

We will now use this new code into a regular MVC architecture.

## Specs

Launch the ruby app with:

```bash
$ ruby app.rb
```

It will instantiate a router and start the app. The router is provided,
you just have to code the controller methods into the `PostsController` class.
Before that, gather the code you wrote in the previous exercises into the
`Post` class.

There is no specs for this exercise (still, you should rake for `rubocop`),
so make sure all your controller method work by launching the app in your terminal.
To test the persistense, you can restart your app. You can also directly look
at the database file `db/posts.db` with the `sqlite3` terminal utility or
a tool like SQLite Browser.

We provide you with the script `reset_db.rb` that you can run with:

```bash
$ ruby reset_db.rb
```

It will drop all data from the database and recreate the schema. You should launch
it at least once before launching `ruby app.rb` so that the database is created.