## Background and Objectives

Our goal in this challenge is to enhance our existing cookbook, coded in the previous challenge, by saving our recipes to a CSV file. That way, when we quit and restart our application in the Terminal, our recipes will still be saved on our computer.

If you want to remember the syntax about how to parse and store data in a CSV file, take a look at [the parsing lecture slides](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/2/3)

Remember that a CSV file is basically an Excel spreadsheet with very simple formatting in which rows are separated by `↵` line breaks and columns are separated by `,` commas. Here's a sample of the CSV file that's used for the `rake` tests for this challenge:

```csv
Crumpets,Crumpets description
Beans & Bacon breakfast,Beans description
Plum pudding,Pudding description
Apple pie,Apple pie description
Christmas crumble,Crumble description
```

What file should the saving/loading happen in? 🤔 Our CSV file needs to store a spreadsheet that lists _all_ the recipes in our application. And, there happens to be a file whose responsibility is to deal with storing all our `Recipe` instances. Yes, it's the `Cookbook`, our **repository**. So, the _only_ file we will change in this challenge is `lib/cookbook.rb`

## Setup

First, let's copy paste your Cookbook's code to this challenge's `lib` folder:

```bash
# make sure you're in the right directory
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/03-Cookbook/03-Cookbook-With-CSV

# copy your code from Cookbook Challenge 2
cp -r ../02-Cookbook/lib .
```

Before starting, run the code you've just imported to make sure that the implemented user actions (list / add / remove) are still working!

```bash
ruby lib/app.rb
```

## Specs

### Parsing

When a Ruby program exits, we lose all the data that we stored in variables. If we want to retrieve the data next time we run the program, we need to persist them, on the hard drive. We'll use a CSV file for that! The CSV file is empty at this time of the challenge, you'll add your own recipes later through the app.

First, let's start off with loading the CSV. When do we need to load the data that's stored in it? When you start the application 🚀 And, do we already have a place in our `Cookbook` that gets run when the application starts? That's right, the `#initialize` method.

Currently our `#initialize` method takes no argument. Let's update it to take on argument, a `String` that indicates the file path of the CSV to open. So, it should look like `initialize(csv_file_path)`. This means that, to initialize a new `Cookbook` instance, you'll have to pass in a valid file path like: `my_cookbook = Cookbook.new('lib/recipes.csv')`.

***

**Important**: Since we changed the number of arguments that the `#initialize` takes, that will affect our `app.rb` file. That file currently should have a line like:

```rb
cookbook   = Cookbook.new
```

Please change this line (you can copy and paste) to:

```rb
csv_file   = File.join(__dir__, 'recipes.csv')
cookbook   = Cookbook.new(csv_file)
```

Now, the `Cookbook` instance will receive the path to the `lib/recipes.csv` file as its argument 📊

***

Then, let's update the `#initialize` to load the recipes from the CSV file. For example, if the CSV file has 5 lines in it, the `@recipes` array should have 5 `Recipe` instances.

Then let's refactor. This code may take a few lines, so it would be nice to write it in a private `#load_csv` method and then to call that method in the `#initialize`.

### Storing

When do we need to save changes to our CSV file? When the recipes in the `Cookbook` change 🌈 And, this means, either:

1. when a new recipe is added; OR
2. when a recipe is deleted

So, let's write a new private method `#save_csv` that saves all the `Recipe` instances in the `@recipes` array to our CSV file. So, if there are 6 `Recipe` instances in the `@recipes` array, the CSV file should have 6 lines when it gets updated.

_Remember: when you store the CSV file, you actually overwrite the entire file. So, even if one recipe was already previously stored in the CSV file, it will have to get stored again each time the file is overwritten._

Then, you'll want to look through the `Cookbook` to find any places where a recipe gets added or removed and then you'll want to call the `#save_csv` method in those places

#### Summary

Update the existing `Cookbook` method:
- `initialize(csv_file_path)` which loads existing `Recipe` from the CSV.

To load and store the data in the CSV, we will implement 2 **private** methods:
- `load_csv`, which loads the existing data from the CSV file to our application. We'll call this inside the `#initialize`.
- `save_csv`, which adds the new recipes as **new rows** in our CSV file. We'll call this any time we either add or remove a recipe from the `Cookbook`.

## Testing

To see if it works, run:

```bash
ruby lib/app.rb
```

Then try adding a new recipe to the cookbook and quitting the application. Then run `ruby lib/app.rb` again. That recipe should show up again (because it got stored when you added it and parsed when you reopened the application) 💾
