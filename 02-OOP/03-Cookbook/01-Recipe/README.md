## Background and Objectives

Before we start working on our cookbook application, we are going to define our `Recipe` class (the **Model** in the **MVC** pattern).

## Specs

### Model

You should always start with your model. The most important thing in your app is your data, and using models allows you to manipulate whatever data you have. 

First, create a new file `recipe.rb` (in the `lib` folder) to define a `Recipe` class. It should have two instance variables, `@name` and `@description`. We should be able to get the `@name` and the `@description` of a Recipe instance by calling the methods `name` and `description`.

Once defined, manually test your model before running `rake`. Load your model in the `irb` console by typing `require_relative 'lib/recipe'` and then create a new instance of `Recipe` by typing `recipe = Recipe.new("chocolate cake", "a delicious chocolate cake")`. It should return an instance of `Recipe` with the correct `@name` and `@description` when calling `recipe` and print out the correct `name` and `description` when calling `recipe.name` and `recipe.description`.