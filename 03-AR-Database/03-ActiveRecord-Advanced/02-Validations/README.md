## Background & Objectives

Now that associations are in place between `Post` and `User`, let's add some validation to the models to make sure we don't store **inconsistent** data in the Database. Before jumping head first into the exercises, take 15 minutes and read this really good guide, top to bottom:

[guides.rubyonrails.org/active\_record\_validations](http://guides.rubyonrails.org/active_record_validations.html)

## Setup

There is already a migration to create the `posts` and `users` table (look at the `db/migrate` folder). You can play these migrations with:

```bash
rake db:create
rake db:migrate
```

## Specs

### Add validations to the `User` model

- A user should have a `username`
- A user should have a **valid** `email`
- Each should have a **unique** `username`

### Add validations to the `Post` model

- A post should have a `title`, `url` (in the right format!) and a user
- A post `title` should be at least 5 characters long
- Each post should have a unique `title` (case insensitive)

### Bonus: Callbacks

We didn't cover this in the lecture, but you need to know that callbacks exist in Active Record. **A callback is a piece of code that is called when an event is fired**.

Example: when a user instance is about to be validated, call a method to do some cleanup beforehand. For instance, we may want to put the `username` in lowercase.

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

Read the [Active Record Callbacks guide](http://guides.rubyonrails.org/active_record_callbacks.html) to answer the last facultative question.

Implement a callback to strip the email before validation.

Implement a callback triggered after a user has been created to send a **welcome email** to this new user. Read about the [available callbacks](http://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks) to figure out which callback to use.

To simulate sending an email, you can use the following method call:

```ruby
FakeMailer.instance.mail("boris@lewagon.org", "Welcome to HN!")
```
