## Background & Objectives

Now it is time to use ruby code to interact with the `jukebox` database. For that we use a gem called `sqlite3` (not surprising!), see [sqlite3](http://rubygems.org/gems/sqlite3).

To install the gem on your computer => `gem install sqlite3`. The goal of this challenge is to query the database with ruby.

## Specs

Complete the program `queries.rb` to answer the following questions:

1. How many rows contains each table ?
2. Return the list of all the artists and sort them by name 	(alphabetical order). **Tip**: use the `order by` SQL filter.
3. Find all the love songs (i.e the tracks that contain "love" in their name) and count them. **Tip**: use the `where` and `like` SQL conditions.
4. Return all the tracks that are longer than 10 minutes and sort them by length. **Tip**: you can use the comparison operator `>` in SQL.

## Tips & Resources

* [http://zetcode.com/db/sqliteruby/](http://zetcode.com/db/sqliteruby/)
* [quick guide to Sqlite](http://viewsourcecode.org/why/hacking/aQuickGuideToSQLite.html)
* [http://www.sqlcommands.net/](http://www.sqlcommands.net/)
* [course in french](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)


