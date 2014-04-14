You will add database `validations` for your Cookbook.

What is a database validation ?

A database validation is a rule that ensures that your data is consistent and valid.

To read more about Active Record Validation, it is [here](http://edgeguides.rubyonrails.org/active_record_validations.html)

Example:

````
class Person < ActiveRecord::Base
  validates :name, presence: true
end
 
Person.create(name: "John Doe").valid? # => true
Person.create(name: nil).valid? # => false
````


## To do

Writes database validation to:

1. Make sure all fields in recipes and users are `required`
2. Make sure that name is `unique` for recipes. (i.e you cannot have two recipes with the same name in your cookbok)
3. Make sure email is `unique` for users
4. Make sure email is `valid` (xxxx@xxxx.xxx)
5. Make sure difficulty of recipes is between 1 and 5

Test your validation by trying to create duplicated recipes or users, or users with invalid email, or recipes with invalid difficulty.

## Resources

[http://edgeguides.rubyonrails.org/active_record_validations.html](http://edgeguides.rubyonrails.org/active_record_validations.html)
