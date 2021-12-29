## Background & Objectives

Sometimes you'll come across a database with table and column names that **don't follow**
the Active Record conventions. That means it won't be able to automatically map
model names to tables, or foreign keys to `has_many` / `belongs_to` associations.

## Specs

- Open the `db/dirty_jukebox.db` database with the `sqlite3` binary and create all the necessary models in `app/models` by browsing the `.schema` (once again you might not be able to see the `.db` files in your text editor because of your settings, use `ls -l db` in the terminal to check that the file is there). This time, you'll need extra effort to correctly map the models to the right tables.
- For some of the `has_many` / `belongs_to` relations, you'll notice that the foreign keys don't match the convention. Time to manually override them.

## Further suggestions

- Read how to [override the naming conventions](http://guides.rubyonrails.org/active_record_basics.html)
- Look for [`foreign_key` usages](http://guides.rubyonrails.org/association_basics.html)
