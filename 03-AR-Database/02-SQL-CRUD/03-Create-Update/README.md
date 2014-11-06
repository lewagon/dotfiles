## Background & Objectives

Again, assume that your `Post` class has access to a global `DB`
variable defined as this:

```ruby
DB = SQLite3::Database.new("a_file.db")
```

## Specs

In this third exercise, we focus on **C**reate and the **U**pdate of `CRUD`).
Why do we have to tackle both at once? Well, when manipulating object instance
in memory, we don't want to think about this difference. We just want to
call `save` on the object and know the database will handle the persistence for us.

### `save`

Implement an **instance** method (why is it an instance method like `destroy`, and not
a class method like `Post.find`?) `save` that will create or update the relevant
row in the database

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
