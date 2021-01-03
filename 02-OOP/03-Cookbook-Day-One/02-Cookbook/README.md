## Background and Objectives

You are now going to code a Cookbook application that manages recipes.

The idea is quite simple: you love cooking, but you need to remember all the recipes you like. This is your cookbook! It'll keep a list of your recipes, allowing you to `list` them, `add` new recipes and `delete` others.

You will build this app using the MVC **pattern**, also used in Rails:

- Model: what is the basic object you want to manipulate?
- View: this is the place where we **display information** to the user (`puts`) and **ask for information** from the user (`gets`)
- Controller: it will fetch and store data of the Model, and tell the view to show or gather data to and from the user.

Please start with a paper and pen to identify your components and their responsibilities.

## Specs

### Model

Luckily, we already defined our `Recipe` class in the previous exercise. Now all we need to do is copy that into our cookbook app. To do so, copy this command into your terminal:

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

This is copying the `recipe.rb` file from the previous exercise, into the `lib` folder in our cookbook app.

### Repository

We now need a structure to store our user's recipes. We don't have a proper database yet, so we will use a class that acts like one (as we saw in the lecture). When a Ruby program exits, we lose all the data that we stored in variables. If we want to retrieve the data next time we run the program, we need to persist them, on the hard drive. We'll use a CSV file for that! The file is empty as this time of the challenge, you'll add your own recipes later through the app.

In the context of this challenge, the repository stores the recipes added by the user. In other words, it **is** the **cookbook**. Let's name the class `Cookbook` to write explicit and meaningful code, but keep in mind that it's the **repository** from this morning's diagram!

Implement the `Cookbook` class with 4 methods:

- `initialize(csv_file_path)` which loads existing `Recipe` from the CSV
- `all` which returns all the recipes
- `add_recipe(recipe)` which adds a new recipe to the cookbook
- `remove_recipe(recipe_index)` which removes a recipe from the cookbook.


### Controller

The controller will gather data from the cookbook to hand them over to the view. It will also ask the view for information to create new recipes. Here are the methods to implement:

- `initialize(cookbook)` takes an instance of the `Cookbook` as an argument.
- `list` all the recipes
- `create` a new recipe
- `destroy` an existing recipe

### View

The view is responsible for all the `puts` and `gets` of your MVC. Make sure you never have those words anywhere else! (except maybe for debugging)

### Tying it all together

When you are ready, you can test your program with:

```bash
ruby lib/app.rb
```

We give you the `app.rb` that requires the code to instantiate a `Cookbook`, `Controller` and start the app. The infinite loop is given in the `Router` because this is not part of MVC. In fact, when you'll work with Rails, this will all be taken for granted and done for you. Which is nice 😉

## Extra Reading

The following concepts are also important in Software Architecture:

- [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Separation of Concerns](http://en.wikipedia.org/wiki/Separation_of_concerns)
