If you're used to using raw SQL to find database records, then you will generally find that there are better ways to carry out the same operations in Ruby/Rails. [Active Record](http://guides.rubyonrails.org/active_record_querying.html) insulates you from the need to use SQL in most cases.

You are going to rebuild the `Cookbook` program using [Active Record](http://guides.rubyonrails.org/active_record_querying.html).

## Reminder

* The cookbook database contains Recipes
* A Recipe has:
	* name:string 
	* description:string 
	* length:integer (minutes) 
	* difficulty:integer 


## To do

Use Active Record to make the Cookbook program.

To help you started, we already prepared a skeleton app for you! 

With Active Record, a Recipe is now an Active Record model.
As you will see, in `/models/recipe.rb` we defined a Class Recipe that inherits from `ActiveRecord::Base`

````
class Recipe < ActiveRecord::Base
end
````

1. In `/config/application.rb` folder write the code to create the database schema. To create a database schema, we use `ActiveRecord::Schema.define`. You can follow this [link](http://www.elfsternberg.com/2008/06/07/using-activerecordschema-to-create-databases-without-rails/) to help.
		

2. In `cookbook.rb` write code to execute the program flow, especially use the [Active Record](http://guides.rubyonrails.org/active_record_querying.html) functions to create, update, delete and read Active Record objects. 


## Resources

[http://guides.rubyonrails.org/active_record_querying.html](http://guides.rubyonrails.org/active_record_querying.html)