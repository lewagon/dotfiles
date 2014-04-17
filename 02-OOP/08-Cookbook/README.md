## Background and Objectives

You will code a CookBook application that manages recipes.

The idea is quite simple: you just got a new oven and want to remember all the recipes you are going to try out with it.
Here comes your cookbook! It'll keep a list of your future culinary successes, allow you to review them, add some recipes and delete others.

This application has all the moving parts of an MVC application: user input, display code, and data persistence. It's important to think about what responsibilities this application has to fulfill. This project must be the opportunity for you to apply what you've learned with the previous exercises. Keep the main OOP principles in mind: [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) & [Separation of Concerns](http://en.wikipedia.org/wiki/Separation_of_concerns)

Identify the main responsibilities of your application and how you can organize those responsibilities in concrete units of Ruby code. Here is a list of very high-level responsibilities you'll have to partly take care of:

* Present and manage choices (the "UI")
* Manage a recipes list (addition, deletion, list)
* Read recipes from the CSV file
* Write recipes to the CSV file

Each of these responsibilities hides many more. List them, and figure out an object model that will correctly articulate all of them.

## Specs

* All files *must* reside in your `lib/` directory.

### cookbook.rb

You'll work with the `Cookbook` class in the `lib/cookbook.rb`.
This `Cookbook` class is your model, it represents the idea of a cookbook.

Recipes must be stored in a CSV file in the same directory than the `coobook.rb` file.

Here are the core functionalities your `Cookbook` class should provide :

##### List all recipes
* Returns an ordered list of all the recipes in your CookBook reading them from your CSV file

##### Add a recipe
* Add the recipe to the end of your CookBook (and update CSV file)

##### Delete a recipe
* Delete that recipe from your CookBook (and update CSV file)

### controller.rb

The `Controller` class role is to get the data from your `Cookbook` class and pass it onto your `UI` class.
The controller will handle "requests" from your UI class.

For instance :

* The UI asks the Controller to get all the recipes, the controller then asks the `Cookbook` model to provide him the needed data and hands them back to the UI.
* The UI asks the Controller to delete a specific recipe, the controller asks the `Cookbook` model to delete the recipe from the cookbook and reports back to the UI.

### ui.rb

The User Interface (_UI_) role is to display data and handle user inputs. The `UI` must call the correct `Controller` method when according to the user's choices.

You must tweak the `lib/ui.rb` to use your Cookbook class and display the following :

```bash
-- Welcome to the CookBook --

What do you wanna do?

- List all recipes [list]
- Add a new recipe [add]
- Delete a recipe [del]
- Exit [Esc.]
```

#### Available choices

##### List all recipes
* Displays a numbered list of all the recipes in your CookBook
* The order of the list should always be the same

Sample output:

```bash
-- Here are all your recipes --

1. Crumpets
2. Beans & Bacon breakfast
3. Plum pudding
4. Apple pie
5. Christmas crumble
```

##### Add a recipe
* Ask for the recipe's name
* Ask the Controller to add it to the CookBook

Sample output:

```bash
-- Enter a new recipe name --

> Carbonara

Your Carbonara recipe has been added successfully !
```

##### Delete a recipe
* Ask for a recipe's index (its number in the displayed list of all recipes)
* Ask the Controller to remove this recipe from to CookBook

Sample output:

```bash
-- Delete a recipe by specifying it's number --

> 1

Your Crumpets recipe has been successfully deleted !
```

##### Exit
* Well... Exit. Maybe you can say goodbye, be polite!

Sample output:

```bash
Goodbye, my dear friend.
```

### app.rb
* This file is provided, you don't need to modify anything.

The `lib/app.rb` file puts all the pieces together, bootstraps the applications (instanciates the Controller and the UI and run them)

You can use `ruby lib/app.rb` to run the program.

## Tips & Resources
