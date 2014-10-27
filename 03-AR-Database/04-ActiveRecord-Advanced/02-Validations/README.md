## Background & Objectives

Now that associations are in place between `Post` and `User`, we want
to add some validation to our models to make sure we don't store
inconsistent data in the Database. Before juming head first into the
exercises, take 15 minutes and read this really good guide:

http://guides.rubyonrails.org/active_record_validations.html


## Setup

We gave you a migration to create the `posts` and `users` table.

```bash
$ rake db:create
$ rake db:migrate
```

## Specs

### Add some validations to the `User` model

- A user should have a username
- A user should have an email, and a valid one
- Users should have unique usernames

### Add some validations to the `Post` model

- A post should have a name, url (in the right format!) and user
- A post name should be at least 5 characters long
- Posts should have unique names (case insensitive)
