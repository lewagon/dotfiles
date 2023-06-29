## Background & Objectives

- Practice using our first `rake` task to create our database.
- Remember that we now have some rake tasks available to us to manipulate our database:

```bash
rake db:create      # Creates your database
rake db:drop        # Destroys your whole database
rake db:migrate     # Runs any migrations that haven't already been run
rake db:version     # Retrieves the current schema version number
rake db:seed        # Populates your database with sample data
rake db:timestamp   # Gives you a timestamp for your migration file name
```

## Specs

Before we move on to changing the **structure** of our database schema, lets first practice creating our database. There is no need to worry about creating tables, or having models. For now, just create the database!

## Key learning points

Understand what each of the `rake` tasks listed above does, and use the correct one to create your database.
