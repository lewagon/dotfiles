## Background & Objectives
You will learn how to execute `migrations` on your database. For that, you will use `Rake`.

Migrations are tasks that create or/and update your database schema. As you know, a relational database has a schema (the architecture of your database) and it is very important to keep control of this schema.

#### Rake
Rake [http://rake.rubyforge.org/](http://rake.rubyforge.org/) is a ruby program that helps you create tasks.

#### Examples of rake tasks
* `db:create`: Task that creates the database
* `db:delete` : Task that deletes the database
* `db:migrate` : Task that runs the database migrations

#### Migrations
Imagine you want to add a new column in your table, but you do not want to remove the table and create a new one (because you don't want to delete your data), so you need a migration task!

## Specs 

In `/db/migrate` we created a `20131226095300_create_recipes.rb` file. This a `migration task`. Migration tasks files are always in the following format `yyyymmddhhmmss_migration_task_name.rb`.

1. Write code in `20131226095300_create_recipes.rb` to create the Recipes table. You can read the documentation of Active Record Migrations [here](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html).

2. Create another migration task. (you need another file for that). This migration task is to add an new column `Rating` to the Recipes table.
 
Then run this migration task with `rake db:migrate`.

Note: you can also have a look at `Rakefile` to see the different tasks available.


## Resources

[http://api.rubyonrails.org/classes/ActiveRecord/Migration.html](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html)
[http://rake.rubyforge.org/doc/rakefile_rdoc.html](http://rake.rubyforge.org/doc/rakefile_rdoc.html)