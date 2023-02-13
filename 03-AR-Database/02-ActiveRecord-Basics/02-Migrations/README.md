## Background & Objectives

- Understand the concept of **schema** migration
- Learn how to execute migrations on your database running `rake` tasks.

## Specs

This exercise is focused on **migrations**. No model yet, so you'll have to code the migrations to create your database schema (remember, the schema is the **structure** of the DB, i.e. tables and columns, **not data**). We want to create the database schema that will host a clone of [Hacker News](https://news.ycombinator.com) - a famous website that shares links about Tech & Startups. We need a `posts` table to store the posts (with a title and a URL).

In `db/migrate` we created a `20141025152200_create_posts.rb` file, containing an Active Record migration class. Migration files are always in the following format `yyyymmddhhmmss_migration_task_name.rb`. The timestamp in the file is really important - it allows `rake db:migrate` to tell which migrations it has not run yet.

### 1. Migration to create a table

Write code in `20141025152200_create_posts.rb` to create the `posts` table.

Your `posts` table should have the following columns:
- a `title`  string
- a `url` string
- `created_at` and `updated_at` timestamps

Then run this migration with `rake db:migrate`.

Check that your table has been created:

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

Can you see more than just your `posts` table? That's Active Record internal plumbing 😊 Can you guess what it's needed for?

### 2. Migration to update a table

Go back to the lecture and read the [Active Record Migration documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html). It shows how easy it is to perform migrations on Rails. But we haven't got to Rails yet ;) so we'll have to create our migration files manually.

Use the task `rake db:timestamp` to get a correct timestamp for your migration file name. Write a new migration in a new file `db/migrate/` to add a new column to the `posts` table.

Call the column `votes` of type `integer` with a default value `0`: a user post doesn't have any vote when created.

Remember what we said about migration filenames! The format is **really** important.

Then run this migration with `rake db:migrate`

## Key learning points

By now, you should have understood that migrations are related to **changes in the structure of the schema** (i.e. the tables and their columns).
