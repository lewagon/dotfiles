Now, it's time to add `Users` to your `Cookbook` database.

A `User` has the following attributes:

* Name:String
* Email:String
	
A user can have multiple recipes. To model this relationship (`association`), the Recipes table must have another field : `user_id` which is the `id` of the `User`

## To do

1. Create a `create_users.rb` migration task.
2. Create a `add_user_id_to_recipes.rb` migration task.
3. Run the migrations with `rake db:migrate`
4. Define the User Class in `models/user.rb` 
5. Specify the Active Record associations for your models `Recipe` and `User`. For more information about Active Record associations, read [this](http://guides.rubyonrails.org/association_basics.html)
6. Feed the database with recipes and users. To create users, you can use the gem [Faker](https://github.com/stympy/faker). You can write your code in `db/seed.rb`
7. Write queries in `cookbook.rb` to answer the following questions:
	* How many users are there in your Cookbook ?
	* What is the average number of recipes per user ?
	* Get the user with the most recipes, with all his recipes.
Read the documentation about [associations](http://guides.rubyonrails.org/association_basics.html) to query associated models.
	

## Resources

[Faker](https://github.com/stympy/faker)
