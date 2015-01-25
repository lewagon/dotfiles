## Background & Objectives

More often, you'll get a database with table and column names who **don't follow**
the Active Record conventions. That's too bad, it can't automagically map
model names to tables, or foreign keys to `has_many` / `belongs_to` associations.

## Specs

- Open the `db/dirty_jukebox.db` database with the `sqlite3` binary and create all the necessary models in `app/models` by browsing the `.schema`. This time, you'll need extra effort to correctly map the models to the right tables.

- For some `has_many` / `belongs_to` relations, the foreign key in the database does not follow the convention. You'll have to manually override it.


## Tips

- Read how to [override the naming conventions](http://guides.rubyonrails.org/active_record_basics.html)
- Look for [`foreign_key` usages](http://guides.rubyonrails.org/association_basics.html)
