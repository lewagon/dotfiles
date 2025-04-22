## Background & Objectives

Now you know about using migrations to update the database schema, let's use our database to insert a few rows and query them. We'll carry on working with our Hacker News clone.

Before starting this exercise, make sure you read the [Active Record starting guide](http://guides.rubyonrails.org/active_record_basics.html).

## Setup

As we are on a new exercise, we need to create a new database in the `db` folder:

```bash
rake db:create
rake db:migrate
```

We gave you the migration file already (see the `db/migrate` file). It should match the one you built from scratch in the previous exercise!

Ensure the schema is in place by opening the DB with `sqlite3`:

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

## Specs

### 1. Create the model class

Add a class model for your `posts` table in the `app/models` folder.

### 2. Use the model to execute queries

We've given you the same app skeleton as last Friday. You can launch it with:

```bash
ruby app.rb
```

Open the `app/controllers/posts_controller.rb` and implement the methods. Remember - do **not** write SQL. Just use Active Record methods with your class model. There's no `rake` to test this second part of the exercise, so you'll have to test your app by launching it in the terminal.

## Key learning points

- What's an ORM? How does it simplify your life?
- What naming convention does Active Record mapping rely on? Where does the magic come from?
- Can you see how much better it is to use Active Record than writing all the SQL yourself?
