## Background & Objectives

Sometimes, you will want to work with an existing database from an existing project.
You would like to write some ruby code to manipulate data, and use ActiveRecord, instead
of writing your SQL queries.

## Specs

- Open the `db/jukebox.db` database with the `sqlite3` binary and creates all
the necessary models in `app/models` by browsing the `.schema`. **Do not** run
the tests before having created the models with the `has_many` and `belongs_to`
relations based on the schema foreign keys. The specs would give you too much clues.

- Once your models are created, you must add some methods and validations.

- Open the `app/queries.rb` file and fetch the relevant results from database with
active record queries (no SQL allowed!)

## Tips

Have a deep read of the [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)