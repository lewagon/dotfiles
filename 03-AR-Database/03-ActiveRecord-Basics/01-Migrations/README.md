## Background & Objectives

- Understand what is an [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping), such as `ActiveRecord`.
- Understand the concept of migration and the distinction between a model and a migration.
- Learn how to execute `migrations` on your database running `rake` tasks.

### Migrations

Imagine you want to add a new column in your table, but you do not want to remove the table and create a new one (because you don't want to delete your data), so you need a migration for that! Migrations are classes that can perform actions on your database scheme. As you know, a relational database has a scheme (the architecture of your database) and it is very important to keep control of this scheme.

VERY IMPORTANT:

- The model **REPRESENTS** your data in ruby => it models your data, that's why it's called a model.
- The migration just PERFORMS OPERATIONS ON the database scheme.

These are two separate roles, hence separate classes.

### Rake

Rake [http://rake.rubyforge.org/](http://rake.rubyforge.org/) is a ruby program that helps you run tasks from the command line. These tasks are defined in a Rakefile. Notice that you have been using `rake` tasks from the beginning to run your tests.

Here we have a new Rakefile in `/lib`, in which we define tasks on the DB. **Examples of database rake tasks**

* `db:create`: Task that creates the database
* `db:delete`: Task that deletes the database
* `db:migrate`: Task that runs the database migrations

As you will see, Rails will automatically create similar rake tasks for you.

## Specs

    ATTENTION: you'll need to call the  bundle install  command in the  lib
    directory before getting started, some commands may not work otherwise.

In `/db/migrate` we created a `20131226095300_create_posts.rb` file, containing an Active Record migration class. Migration files are always in the following format `yyyymmddhhmmss_migration_task_name.rb`. It enables rake to keep track of the current state of the migrations already executed.

1. Write code in `20131226095300_create_posts.rb` to create the `posts` table. You have to read the documentation of Active Record Migrations [here](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html). Your `posts` table should have the following columns:

   * name:string
   * source_url:string
   * created_at:datetime

2. Run this migration with `rake db:migrate`

3. Create a new migration to add a new column `rating:integer` to the posts table. You need a new file for that (with good naming conventions). Then run this new migration with `rake db:migrate`.

4. Add working queries to make the interface work properly.

## Learning Badges

- What's a migration? How does it differ from the model?
- What's the syntax for defining an Active Record migration? What's the specificity of the migration file name?
- How do you run a migration? With which rake task?

## Tips & Resources

[http://api.rubyonrails.org/classes/ActiveRecord/Migration.html](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html)
[http://rake.rubyforge.org/doc/rakefile_rdoc.html](http://rake.rubyforge.org/doc/rakefile_rdoc.html)
