## Background & Objectives

Now that you have understood that migrations help you to update the database schema,
let's use our database to insert some rows, and query them. We'll still work with our
Hacker News clone.

Before starting this exercise, make sure you read the [Active Record starting duie](http://guides.rubyonrails.org/active_record_basics.html).

## Setup

As we changed exercise, we need to create a new database in the `db` folder:

```bash
$ rake db:create
$ rake db:migrate
```

We gave you the migration file (see the `db/migrate` file), it should be the same
as the one you built from scratch in the previous exercise!

Ensure the schema is in place by openning the DB with `sqlite3`:

```bash
$ sqlite3 db/development.sqlite3
sqlite> .schema
```

## Specs

### 1. Create the model class

Add a class model for your `posts` table in the `app/models` folder.

### 2. Use the model to execute queries

We gave you the same app skeleton than last Friday. You can launch it with:

```bash
$ ruby app.rb
```

Open the `app/controllers/posts_controller.rb` and implement the methods. You
should **not** write SQL, but only use ActiveRecord methods with your class model.
There's no `rake` to test this second part of the exercise, but test your app
by launching it in the terminal.

## Learning Badges

* What's an ORM? How does it simplify your life?
* On which naming convention relies Active Record mapping? Where does the magic comes from?
* See how it's easier with ActiveRecord than having to write all this SQL yourself?