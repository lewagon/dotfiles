## Background & Objectives

Again, assume that your `Post` class has access to a global `DB` variable defined as this:

```ruby
DB = SQLite3::Database.new("a_file.db")
```

You can still use the `test.rb` file to test your methods.

## Specs

In this fourth exercise, we'll focus on the **C**reate and the **U**pdate of `CRUD`. Why are we doing the `C` and the `U` together? It's because the process is very similar. When manipulating object instances, if we call `save` on something and it doesn't exist in our DB yet, it will get **C**reated. If it already exists, it will just get **U**pdated.

### `save`

Implement an **instance** method (why is it an instance method like `destroy`, and not a class method like `Post.find`?) `save` that will create or update the relevant row in the database

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil (the post is not persisted yet)
post.save  # TODO: persist the record!
post.id
# => 1 (expected result, the database has inserted a row, store the id in memory)

post.title = "Awesome article, updated"
post.save   # TODO: should update the record in the database
```

You may need to use [last\_insert\_row\_id](http://zetcode.com/db/sqliteruby/connect/).
