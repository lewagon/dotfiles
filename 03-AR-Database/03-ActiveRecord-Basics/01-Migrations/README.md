## Background & Objectives

- Understand what is an [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping), such as `ActiveRecord`.
- Understand the concept of migration and the distinction between a model and a migration.
- Learn how to execute `migrations` on your database running `rake` tasks.

## Getting started (READ THIS!)

Before starting the exercices, be sure to follow the following steps:

* Go to the exercice directory
* Install the bundler gem with `gem install bundler`
* Install the exercice dependencies with `bundle install`

## The database

To do this exercice you don't need to know where the database comes from. Just use the commands provided with rake:

* `rake db:create` - Creates an empty database
* `rake db:migrate` - Runs your **pending** migrations
* `rake db:drop` - Destroys the database

If you're stuck and your migrations are not running, use `rake db:drop` followed by `rake db:migrate` to restart.

You need to understand that those are **commands** not Ruby code! It's working with [Rake](http://rake.rubyforge.org/), You've been using it from the start, it's the same as before but with a specific task to run.

### Migrations

Imagine you want to add a new column in your table, but you do not want to remove the table and create a new one (because you don't want to delete your data), so you need a migration for that! Migrations are classes that can perform actions on your database scheme. As you know, a relational database has a scheme (the architecture of your database) and it is very important to keep control of this scheme.

VERY IMPORTANT:

- The model **REPRESENTS** your data in ruby => it models your data, that's why it's called a model.
- The migration just PERFORMS OPERATIONS ON the database scheme.

These are two separate roles, hence separate classes.

### Rake

You need to be in the `lib` folder for rake tasks to work.

## Specs

**ATTENTION:** you'll need to call the `bundle install`  command in the  lib directory before getting started, some commands may not work otherwise.

In `/db/migrate` we created a `20131226095300_create_posts.rb` file, containing an Active Record migration class. Migration files are always in the following format `yyyymmddhhmmss_migration_task_name.rb`. It enables rake to keep track of the current state of the migrations already executed.

### 1. Write a migration

Write code in `20131226095300_create_posts.rb` to create the `posts` table.

You have to read the [ActiveRecord Migrations documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html).

Your `posts` table should have the following columns:

  * name as a string
  * source_url as a string
  * created_at as a datetime

Then run this migration with `rake db:migrate`

### 2. Modify an existing table

Write a new migration, in a new file in `lib/db/migrate/` to add a new column to the `posts` table.

This column will be called `rating` dans will be of type `integer`.

You'll have to create a new file with the date prefix in the name like `YYYYMMDDHHmmSS_xxx.rb` (replace `YY...` with the date/time and `xxx` with the file name).

Then run this migration with `rake db:migrate`

### 3. Add SQL queries to the interface

Open `interface.rb`. You'll find several places indicated with a `'TODO ...'` marker. Replace those placeholder string with pure SQL queries to make the interface work. **Don't use an ActiveRecord model for now, that's the next exercice, only SQL here!**

## Learning Badges

- What's a migration? How does it differ from the model?
- What's the syntax for defining an Active Record migration? What's the specificity of the migration file name?
- How do you run a migration? With which rake task?

## Tips & Resources

[http://api.rubyonrails.org/classes/ActiveRecord/Migration.html](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html)
[http://rake.rubyforge.org/doc/rakefile_rdoc.html](http://rake.rubyforge.org/doc/rakefile_rdoc.html)

## Troubleshooting

Here are common error messages you might stumble upon during this exercice:

    rake aborted!
    Don't know how to build task 'db:migrate'

Check that you're in the `lib` folder.

    rake aborted!
    LoadError: cannot load such file -- active_record

You probably forgot to run `bundle install` or it generated an error you didn't read.

    `initialize': SQLite3::SQLException: no such table: posts:
    INSERT INTO posts (name, source_url, rating, date)
    VALUES(...)

Are you sure you ran `rake db:migrate` ?

    interface.rb:16:in `create_post': undefined local variable or method `created_at' for main:Object (NameError)

Check your code again, are you sur you've a `created_at` variable?

    `initialize': SQLite3::SQLException: table posts has no column named date:
    INSERT INTO posts (name, source_url, rating, date)
    VALUES(...)

Is the datetime attribute called `date` ? You sure? Really sure? Really?...
