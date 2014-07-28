## Background & Objectives

Now, it's time to add `users` to your database and to link users and posts.

## Getting started

Before starting the exercices, be sure to follow the following steps:

* Go to the exercice directory
* Install the exercice dependencies with `bundle install`

## Specs

We created two models for you `Post` and `User`.

A `User` has the following attributes:

* name as a string
* email as a string

A post belongs to a user and a user can have many posts. To model this one-to-many relationships, two steps are necessary:

### 1. Write a migration

Write a migration to create the `users` table.

### 2. Write another migration

Continue by adding a foreign key in the relevant table to represent the user-post association.

To do so, create a new migration and run it.

### 3. Update your models

Edit your two models to write what's need for the association to work properly. Take a look at the [Associations section](http://guides.rubyonrails.org/association_basics.html) of the ActiveRecord documentation.

### Summary

Again, you have to undersand that your db comes first, it is the physical representation of your data. ActiveRecord comes second and represent your db in the ruby world.

## Learning Badges

- Which kinds of relations between table do you know?
- How does Active Record models these DB relations in the ruby world?
- Whichs kinds of Active Record associations do you know (for every type of relationships between tables)?

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
