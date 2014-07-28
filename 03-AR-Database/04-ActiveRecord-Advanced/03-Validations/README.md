## Background & Objectives

You will now add database **validations** for your posts.

What is a database validation? It's a _rule_ that ensures that your data is consistent and valid. Read more about [ActiveRecord Validations](http://edgeguides.rubyonrails.org/active_record_validations.html) in the guides.

## Getting started (READ THIS!)

Before starting the exercices, be sure to follow the following steps:

* Go to the exercice directory
* Install the exercice dependencies with `bundle install`

## Validations

An ActiveRecord validation is defined at the class level as follows:

``` ruby
class Person < ActiveRecord::Base
  validates :name, presence: true
end

Person.create(name: 'John Doe').valid? # => true
Person.create(name: nil).valid? # => false
```

## Specs

Writes database validation to:

1. Make sure all fields in posts and users are `required`
2. Make sure that `name` is _unique_ for posts (i.e you cannot have two posts with the same name in your app)
3. Make sure `email` is _unique_ for users
4. Make sure `email` is _valid_ (xxxx@xxxx.xxx, did you say Regexp?)
5. Make sure `rating` is greater or equal to `0`

Test your validation by trying to create duplicated posts or users, users with invalid email, or negative number of ratings.

## Resources

[http://edgeguides.rubyonrails.org/active_record_validations.html](http://edgeguides.rubyonrails.org/active_record_validations.html)
