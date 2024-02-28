## Background and Objectives

You are now going to code a Cookbook application that manages recipes.

The idea is quite simple: you love cooking, but you need to remember all the recipes you like. This is your cookbook! It'll keep a list of your recipes, allowing you to `list` them, `add` new recipes and `remove` others.

You will build this app using the MVC **pattern** (also used in Rails):
- Model: what is the basic object you want to manipulate?
- View: this is the place where we **display information** to the user (`puts`) and **ask for information** from the user (`gets`)
- Controller: it will fetch and store data of the Model, and tell the View to show or gather data to and from the user.

Please start with a paper and pen to identify your components and their responsibilities!

## Specs

Here is what we are going to build:

### Model

Luckily, we already defined our `Recipe` class in the previous exercise. Now all we need to do is copy that into our cookbook app. To do so, copy this command into your terminal:

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

This command will copy the `recipe.rb` file from the previous exercise, into the `lib` folder in our cookbook app.

### Repository

We now need a structure to store our user's recipes. We don't have a proper database yet, so we will use a class that acts like one (as we saw in the lecture).

In the context of this challenge, the repository stores the recipes added by the user. In other words, it **is** the **cookbook**. Let's name the class `Cookbook` to write explicit and meaningful code, but keep in mind that it's the **repository** from the lecture's diagram!

Implement the `Cookbook` class with 4 methods:
- `initialize` which creates an empty array to store your `Recipe` instances
- `all` which returns all the recipes
- `create(recipe)` which creates a recipe and adds it to the cookbook
- `destroy(recipe_index)` which removes a recipe from the cookbook

_Note: When a Ruby program exits, we lose all the data that we stored in variables. This means your Cookbook will get "cleared" every time the Terminal process quits. That's OK, and we'll fix this problem in the next challenge, so don't worry._

### Controller

The controller will gather data from the cookbook to hand them over to the view. It will also ask the view for information to create new recipes. Here are the methods to implement:
- `initialize(cookbook)` takes an instance of the `Cookbook` as an argument.
- `list` all the recipes
- `add` a new recipe
- `remove` an existing recipe

### View

The view is responsible for all the `puts` and `gets` of your MVC. Make sure you never have those words anywhere else! (except maybe for debugging)

### Tying it all together

When you are ready, you can test your program with:

```bash
ruby lib/app.rb
```

We give you the `app.rb` that requires the code to instantiate a `Cookbook`, `Controller` and start the app. The infinite loop is given in the `Router` because this is not part of MVC. In fact, when you'll work with Rails, this will all be taken for granted and done for you. Which is nice 😉

## Some advice

This Cookbook is a LOT of fun, but it's also a big challenge, involving a lot of files! Just as we did in the lecture, once you have implemented the `Recipe` model, try to implement each user journey one by one. Start by adding the first feature to your app: adding a new recipe. What do you need for this, which method in the controller, in the view, ...?

Additionally, two important things you should rely on while coding the challenge:

- `rake` , it's here to guide you and help you know what left you have to do, so make sure you use it often 👌
- running your app with `ruby lib/app.rb` so you can try your user journey. Let the error messages guide you!

Happy coding!

## Extra Reading

The following concepts are also important in Software Architecture:
- [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Separation of Concerns](http://en.wikipedia.org/wiki/Separation_of_concerns)
