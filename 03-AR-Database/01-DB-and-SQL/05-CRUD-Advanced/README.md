## Background & Objectives

The goal of this exercise is to implement the remaining CRUD actions from the previous challenge.

**Note**: As a reminder, in this exercise, we **give** you the `DB` global variable, so no need to instantiate a new `SQLite3::Database` yourself. Just use `DB.execute` in your code, and it'll work (but feel free to have a look at `spec/models/post_spec.rb` to see how the `DB` variable is created).

## Setup

First, let's copy paste your code from the previous challenge into this challenge's folder:

```bash
# make sure you're in the right directory:
cd ~/code/<user.github_nickname>/fullstack-challenges/03-AR-Database/01-DB-and-SQL/05-CRUD-Advanced

# copy your code from CRUD - Read challenge:
cp -r ../04-CRUD-Read/app .
```

## Tests

We also prepared a `test.rb` file for you where the `DB` global variable is created the same way as in `spec/models/post_spec.rb`. Feel free to use this file to call and test your methods as you go.

## Specs

### SQL injections

Just like the last exercise, we need to make sure to protect our databases against SQL injections. That means we must never interpolate SQL queries with user data but use `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) instead.

ℹ️ For both parts of this exercise, to prevent SQL injections you'll need to pass _several arguments_ to the `.execute` method. Remember to check out the lecture slides (or the last challenge) for a refresher on how this is done!


### Part 1: DELETE

In the first part of this exercise, we'll focus on **D**elete (the `D` in `CRUD`).

To do this, we'll need the following method:

### `#destroy`

Implement an **instance** method `destroy` that will delete the relevant row from the database. Why is this method an instance method, and not a class method like `Post.find`' or `Post.all` ? 🤔 If you're not sure, try asking your buddy or a TA!

Let's look at an example of how this method will be used 👇

```ruby
post = Post.find(42)  # Get the row with id 42.
post.destroy          # TODO: get rid of that row in the database

# Expected result then
Post.find(42)
# => nil
```

And again, let's write some pseudocode to help us:
```ruby
# TODO: Write the SQL query to delete a specific post from the database
# TODO: Use DB.execute to execute the SQL query
```

### Part 2: CREATE & UPDATE

In the next part of the exercise, we'll focus on the **C**reate and the **U**pdate of `CRUD`.

 Why are we doing the `C` and the `U` together? It's because the process is very similar! In both scenarios, we are sending new data to the database. The only difference is whether or not the object that we are working with already exists in the database. If it does, then we are updating some values for an existing record (how do we find an existing record in the DB?). If it doesn't exist in the database yet, then we are inserting values and creating a new record.

 When manipulating object instances, if we call `save` on something and it doesn't exist in our DB yet, it will get **C**reated. If it already exists, it will just get **U**pdated. 💡 HINT: what is the main difference between an existing object and a brand new one?

### `#save`

Implement an **instance** method  `save` that will create or update the relevant row in the database. Again, make sure you can answer why it is an instance method like `destroy` rather than an a class method like `Post.find`.

Let's look at an example of how this method will be used 👇

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil (the post is not persisted yet)
post.save  # Will persist a new record!
post.id
# => 1 (expected result, the database has inserted a row, store the id in memory)

post.title = "Awesome article, updated"
post.save   # Should update the existing record in the database!
post.title
# => "Awesome article, updated"
```

And let's write some pseudocode to help us with the steps:
```ruby
# TODO: Determine if the post needs to be *created* or *updated*
# TODO: If the post already exists:
  # TODO: Write the SQL query to update the post in the database
  # TODO: Use DB.execute to execute the query
# TODO: If the post is new,
  # TODO: Write the SQL query to add a new post to the database
  # TODO: Use DB.execute to execute the query
  # TODO: Update the @id of the post using data from the databse
```

💡 HINT: You may need to use [last\_insert\_row\_id](http://zetcode.com/db/sqliteruby/connect/), as we saw in the lecture 😉.

