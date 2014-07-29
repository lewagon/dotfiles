## Background & Objectives

Now it's time to **unleash the kraken** :) You will use the ActiveRecord ORM to make queries to your DB but manipulating friendly Ruby objects directly instead of performing SQL queries and handling manually the mapping to these Ruby objects (which is a pain in the ass...).

Before you start, read the [Active Record documentation](http://guides.rubyonrails.org/active_record_basics.html).

## Getting started (READ THIS!)

Before starting the exercices, be sure to follow the following steps:

* Go to the exercice directory
* Install the bundler gem with `gem install bundler`
* Install the exercice dependencies with `bundle install`

**ATTENTION:** this is not the same exercice directory, you need to run `rake db:migrate` to run the migration before getting started.

## The database

To do this exercice you don't need to know where the database comes from.

### Rake

You need to be in the `lib` folder for rake tasks to work.

## Specs

Based on the previous exercice, we've added a `Post` model defined as follows:

``` ruby
class Post < ActiveRecord::Base
end
```

This simple `ActiveRecord::Base` inheritance automatically maps the `Post` model to the `posts` table. Notice that all the magic of ActiveRecord mapping relies on this simple convention (**CONVENTION** over **CONFIGURATION**):

* the _model_ is __singular__ and __camel-cased__ (ex: `Post` or `PostAuthor`)
* the _table_ is __plural__ and __snake-cased__ (ex: `posts` or `post_authors`)

### 1. Use the model to execute queries

Open `interface.rb`, it's roughtly the same than before except now you'll have to replace the `# TODO` marker with `Post` calls.

Use [ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) basic methods to create, read, update and delete your posts.

## Learning Badges

* What's an ORM? How does it simplify your life?
* On which naming convention relies Active Record mapping? Where does the magic comes from?

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
