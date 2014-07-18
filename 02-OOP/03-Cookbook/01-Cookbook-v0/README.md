## Background and Objectives

You will code a Cookbook application that manages recipes.

The idea is quite simple: you just got a new oven and want to remember all the recipes you are going to try out with it. Here comes your cookbook! It'll keep a list of your future culinary successes, allow you to review them, add some recipes and delete others.

You will build this app using the MVC **pattern**, also use in Rails:

- Model: what is the basic object you want to manipulate?
- View: it is here to display data to the user (`puts`) and ask data to the user (`gets`)
- Controller: it will fetch and store data of the Model, and tell the view to show or gather data to and from the user.

The following concepts are also important in Software Architecture:

- [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Separation of Concerns](http://en.wikipedia.org/wiki/Separation_of_concerns)

Please start with a paper and pen, identify your components and their responsibilities.

## Specs

### Model

You should always start with your model. The most important thing in your app is your data, and models are here to represent your data. So create a new file `recipe.rb` to define a `Recipe` class. It should have two instance variables, `@name` and `@description`.

### Database

We also need another class which will act as a database. We don't have a database yet, so we will use a class acting as it (like in the lecture). Moreover, we want to store our recipes, and don't want to lose them when exiting the program. We need to store them on the hard drive, so we'll use a CSV file.

Please implement a `Cookbook` class which will act as fake database. It should implement 3 methods:

- `initialize(csv_file)` which loads existing `Recipe` from the CSV
- `add_recipe(recipe)` which adds a new recipe to the cookbook
- `remove_recipe(recipe_id)` which removes a recipe from the cookbook.

## Controller

The controller will gather data from the cookbook to hand them over to the view. It will also ask the view for information to create new recipes. Here are the methods to implement:

- `initialize(cookbook)` takes as argument an instance of the `Cookbook` (fake database).
- `list` all the recipes
- `create` a new recipe
- `destroy` an existing recipe

### View

The view is responsible for all the `puts` and `gets` of your code.

### Tying all together

When you are ready, you can test your program with:

```bash
$ ruby lib/app.rb
```

We give you the `app.rb` which requires the code, instantiate a `Cookbook`, `Controller` and starts the app. The infinite loop is given in the `Router` because this is not part of MVC. In fact, when you'll work with Rails, it will be something taken as granted as well.
