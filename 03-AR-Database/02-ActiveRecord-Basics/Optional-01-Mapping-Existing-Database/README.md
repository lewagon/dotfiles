## Background & Objectives

Sometimes, you will want to work with an existing database from an existing project.
You might need to write some Ruby code to manipulate data using Active Record, instead
of writing SQL queries.

## Specs

- Open the `db/jukebox.db` database with the `sqlite3` binary and create all
the necessary models in `app/models` by browsing the `.schema` (you might not see the `.db` files as your text editor's default settings are to keep them hidden, you can still check that the file is there by using `ls -l db` in the terminal). **Do not** run
the tests before you've created the models with the `has_many` and `belongs_to`
relationships based on the schema foreign keys. The specs will give you too many clues.
- Once your models are created, add some methods and validations.
- Open the `app/queries.rb` file and fetch the relevant results from database with
Active Record queries (no SQL allowed!)

## Further suggestions

Have a deep read of the [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)
