## Background & Objectives

Now that associations are in place between `Post` and `User`, we want
to add some validation to our models to make sure we don't store
inconsistent data in the Database. Before juming head first into the
exercises, take 15 minutes and read this really good guide:

[guides.rubyonrails.org/active_record_validations.html](http://edgeguides.rubyonrails.org/active_record_validations.html)


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

### Callbacks

We did not talk about this subject in the lecture, but you need to know that
callbacks exist in ActiveRecord. A callback is a piece of code that is called
when an event is fired. We will heavily use this notion when programming
with jQuery.

Example: when a user instance is about to be validated, call some code to do
some cleanup. For instance, we may want to put the `username` in lower case.
We can do that with the following code:

```ruby
class User
  before_validation :lower_username

  private

  def lower_username
    self.username = username.downcase unless username.nil?
  end
end
```

Read the [Active Record Callbacks guide](http://guides.rubyonrails.org/active_record_callbacks.html)
to answer the last facultative question.