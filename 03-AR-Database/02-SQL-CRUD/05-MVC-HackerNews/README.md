## Background & Objectives

In the previous exercises, we built methods directly in our model class, `Post`. It meant we didn't need a `Repository` class like when we were storing data into a CSV, because the model class handles the relation with the database directly. Awesome right?

The next step is to insert our new code into the proper MVC architecture.

## Specs

Launch the ruby app with:

```bash
ruby app.rb
```

The router is already provided. You just have to:
- Put all the code you wrote in the previous exercises into the `Post` class.
- Code the controller in the `PostsController` class.
- Code the view and `PostsView` class.

There are no specs for this exercise (still, you should rake for `rubocop`), so you'll need to test your controller methods by launching the app in your terminal. To make sure things are saving, restart your app and check they are still there. You can also directly look at the database file `db/posts.db` with the `sqlite3` terminal utility or a tool like SQLite Browser.

We provide you with the script `reset_db.rb` that you can run with:

```bash
ruby reset_db.rb
```

It will drop all data from the database and re-create the schema. You should launch it once before launching `ruby app.rb` so that the database is created.
