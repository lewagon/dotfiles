## Background and Objectives

Before we start working on our cookbook application, we are going to define our `Recipe` class (the **Model** in the **MVC** pattern).

## Specs

### Model

You should always start with your model. The most important thing in your app is your data, and using models allows you to manipulate whatever data you have. So, create a new file `recipe.rb` (in the `lib` folder) to define a `Recipe` class. It should have two instance variables, `@name` and `@description`. We should be able to get the `@name` and the `@description` of a Recipe instance by calling the methods `name` and `description`.
