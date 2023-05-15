## Background & Objectives

The goal of this and the following exercise is to implement each one of the `CRUD` operations and build a copycat of [Hacker News](https://news.ycombinator.com). For those who don't know, HackerNews is a _very minimal_ social news website (with a focus on computer science & technology), where users can submit links to articles and other users can choose to "upvote" those article links.

**Note**: in this exercise, similar to the last exercise, we **give** you the `DB` global variable, so no need to instantiate a new `SQLite3::Database` yourself. The difference from the last exercise is that this time the `DB` is a **global variable**, meaning it's accessible from everywhere in your code, so there is no need to pass the db as argument like we did in the last challenge. Just use `DB.execute` anywhere in your code, and it'll work (but feel free to have a look at `spec/models/post_spec.rb` to see how the `DB` variable is created).

## Tests

We also prepared a `test.rb` file for you where the `DB` global variable is created the same way as in `spec/models/post_spec.rb`. Feel free to use this file to call and test your methods as you go.

## Specs

### Part 1: Setup our model

We have given you a `post.rb` file with a `Post` class defined inside in order to handle the `posts` table, defined in the database as follows:

```sql
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);
```

#### `#initialize`

As always, the first thing we should do when creating a model is define what attributes the model should have. So using the table definition above, add the `initialize` method inside your `Post` class and store the table columns as instance variables.

#### getters and setters

Next up is to define which attributes (if any) are **readable** and which are **writable**. For our HackerNews clone:

  - the `id` can be revealed but should not be editable
  - the `title` and `url` can be viewed and edited
  - the number of `votes` can be seen and incremented through upvoting, but should not be directly editable

### Part 2: READ
In this part of the exercise, we will focus on implementing our **R**ead (the `R` in `CRUD`) actions.

There are two scenarios in which we may want to **read** from our database:

  1. In order to _find_ one specific post
  2. Or, to get _all_ posts we have

Let's implement these scenarios with the following methods:

#### `#find`

Implement a **class** method `find(id)` on the `Post` class that takes an integer as an argument (the post id) and returns an instance of `Post`.

Let's use **pseudocode** to help us in breaking down the steps we'll need:
```ruby
# TODO: Write the SQL query to get the post with the given id
# TODO: Use DB.execute to execute the SQL query
# TODO: Return the post found - as an instance of a Post!
```

☝️ Make sure to use the global variable `DB` defined in the program, no need for you to instantiate it yourself!

💡 HINT: make sure to pay attention to what **data type** you get back from the `DB.execute` method versus what data type **you need** to have inside your model. How can we make sure we end up with a `Post` instance?

##### SQL injections
As we learned in the lecture, we also need to protect our `find` method against **SQL injections**. As a reminder, an SQL injection is a serious security issue, where an attacker can interfere with your application by means of malicious queries to the database. Potential effects are, for example, allowing an ill-intended user to access restricted data, i.e. social security numbers, credit cards, or passwords 😱. In some cases, the attacker can even change or delete data, permanently damaging the application. If you want to read more about SQL injections and see some examples, check out the _Additional Resources_ section at the bottom of this challenge.

To protect your database against SQL injections, you must never interpolate SQL queries with user data but use `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) instead.

ℹ️ For this exercise, to prevent SQL injections you'll need to pass _several arguments_ to the `.execute` method. Remember to check out the lecture slides for a refresher on how this is done.

#### `#all`

Next, implement a **class** method `all` on the `Post` class which takes no argument and will return an array containing every `Post` instance our database has.

Again, let's use **pseudocode** to help us break down our steps:
```ruby
# TODO: Write the SQL query to get all posts from the database
# TODO: Use DB.execute to execute the SQL query
# TODO: Return an array of all posts - all as Post instances!
```

Just as in the `#find` method, we need to pay attention to what **data types** we get back from the `DB.execute` method versus what data types **we need** to have inside our model!

**Optional: Refactoring**

You may notice that we end up repeating ourselves in the `#find` and `#all` methods when we need to convert our response data from the database into instances of `Post`. If you want, try refactoring this bit of code into a private method called `build_record(row)`, which takes a row of data from the database and converts it to a `Post` instance. Then use this `#build_record` method wherever you need to convert your data.


## Additional resources

An SQL injection is a type of attack where the person using your application won't just pass a regular integer `id` to the `find` method, but will add an evil string to damage your data. If you look at the SQL query in the spec, you'll see what we mean.

You can read [this Medium article](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9) and [this StackOverflow answer](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) to wrap your head around SQL injections 👌

If you wish to see SQL Injections in action, [hack this bank](https://www.hacksplaining.com/exercises/sql-injection#/start) and you'll get the picture!

**Never trust user data**!
