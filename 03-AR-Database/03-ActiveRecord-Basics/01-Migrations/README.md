## Background & Objectives

- Understand the concept of **schema** migration
- Learn how to execute `migrations` on your database running `rake` tasks.

## Setup

Don't forget to run in your terminal:

```bash
$ gem install activerecord
```

## Specs

This exercise focuses on **migrations** only. We won't use any model.
So, and for the last time we promise, we'll right some SQL commands.
We want to create the database schema which will host a clone of [Hacker News](https://news.ycombinator.com).
It's the famous website to share links about Technology & Startup.
We need a `posts` table storing posts (with a title and a URL).


In `db/migrate` we created a `20141025152200_create_posts.rb` file, containing an Active Record migration class. Migration files are always in the following format `yyyymmddhhmmss_migration_task_name.rb`. The timestamp in the file is really important for `rake db:migrate` to know which migrations
it has not run yet.

### 1. Migration to create a table

Write code in `20141025152200_create_posts.rb` to create the `posts` table.

Go back to the lecture and read the [ActiveRecord Migrations documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html). It talks about generating migrations, right now
we are not in Rails so we can't. I'll get even easier then!

Your `posts` table should have the following columns:

- `name` as a `String`
- `url` as a `String`
- `created_at` and `updated_at` timestamps

Then run this migration with `rake db:migrate`.

Check that your table has been created:

```bash
$ sqlite3 db/development.sqlite3
sqlite> .schema
```

Can you see more than just your `posts` table? That's ActiveRecord internal plumbing :)
Can you guess what it's needed for?

### 2. Migration to update a table

Write a new migration, in a new file in `db/migrate/` to add a new column to the `posts` table.

This column will be called `votes` dans will be of type `integer`.

Remember what we said about migration filenames, the format is **really** important.

Then run this migration with `rake db:migrate`

## Learning Badges

You should have understood by now that migrations are related to changes in the structure of the schema
(i.e. what are the tables and their columns).