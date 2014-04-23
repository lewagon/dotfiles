## Background & Objectives

You will now add database `validations` for your posts. What is a database validation ? A database validation is a rule that ensures that your data is consistent and valid. To read more about Active Record Validation, it is [here](http://edgeguides.rubyonrails.org/active_record_validations.html)

Example:

````
class Person < ActiveRecord::Base
  validates :name, presence: true
end
 
Person.create(name: "John Doe").valid? # => true
Person.create(name: nil).valid? # => false
````


## Specs

Writes database validation to:

1. Make sure all fields in posts and users are `required`
1. Make sure that name is `unique` for posts. (i.e you cannot have two posts with the same name in your app)
1. Make sure email is `unique` for users
1. Make sure email is `valid` (xxxx@xxxx.xxx)
1. Make sure rating is `>= 0`

Test your validation by trying to create duplicated posts or users, users with invalid email, or negative number of ratings.

## Resources

[http://edgeguides.rubyonrails.org/active_record_validations.html](http://edgeguides.rubyonrails.org/active_record_validations.html)
