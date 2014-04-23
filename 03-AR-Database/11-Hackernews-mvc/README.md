## Obectives

Build a complete Cookbook application that you will run in the terminal with `ruby cookbook.rb`

This application is a library for recipes. Here is what you will be able to do:

* Login or Register as user
* See your recipes or search for other recipes
* Create new recipes

Example:

 ````
 Welcome to Le Wagon Cookbook!
 
 Are you already a member ? y/n
 If yes => what is your email ?
 If no => you can register by giving your name and email
 
 What do you want to do ?
 	1. Search for your recipes
 	2. Search for other recipes
 	3 Create a new recipe
 	4. Delete a recipe
 
 ````
 
**Warning**: you should be careful to database validations and return correct messages when database validation fail.
For example, if someone registers with an email that already exists, you have to return the correct error message.