## Background & Objectives

Now it's time to make a 3-model app! And you guessed it, we'll be introducing a many to
many relationship (`n:n`). So what's the deal? Well, it's time to build a cocktail
manager. We want to store our favourite cocktails, and their recipes.

## Rails app generation

Let's install `yarn` if you haven't already!

```bash
# OSX
brew install yarn

# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

**Note**: You should now be able to run these steps without this cheat sheet! Don't forget the `--webpack` option! Let's also add a `--database=postgresql` (we will talk about this tomorrow). 😉

```bash
cd ~/code/<user.github_nickname>
rails new rails-mister-cocktail -T --webpack --database=postgresql
cd rails-mister-cocktail
```

We then need to create the postgresql database for this new rails app.

```bash
rails db:create
```

Let's set up git, create a repo on GitHub and push our skeleton.

```bash
git add .
git commit -m "rails new"
hub create
git push origin master
```

Let's import the teacher's spec to be able to `rake` our progress.

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

You'll be able to test your code with:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
rake                             # Launch tests
```

Don't forget to `commit` and `push` your work often.

## Specs

### 1 - Models

Go to [db.lewagon.com](http://db.lewagon.com) and draw the schema with your buddy. The tables
we need are `cocktails`, `ingredients` and `doses`. Think about the relations between the tables and who is storing the *references*. 😉

Validate all models tests before moving to the routing layer. You can use this command:

```bash
rspec spec/models
```

to selectively run tests in the `spec/models` folder.

#### Attributes

- A **cocktail** has a name (e.g. `"Mint Julep"`, `"Whiskey Sour"`, `"Mojito"`)
- An **ingredient** has a name (e.g. `"lemon"`, `"ice"`, `"mint leaves"`)
- A **dose** is the amount needed for each ingredient in a cocktail (e.g. the Mojito cocktail needs **6cl** of lemon). So each dose references a cocktail, an ingredient and has a description.

#### Validation

- A cocktail must have a unique name.
- An ingredient must have a unique name.
- A dose must have a description, a cocktail and an ingredient, and [cocktail, ingredient] pairings should be unique.

#### Associations

- A cocktail has many doses
- A cocktail has many ingredients through doses
- An ingredient has many doses
- A dose belongs to an ingredient
- A dose belongs to a cocktail
- You can't delete an ingredient if it used by at least one cocktail.
- When you delete a cocktail, you should delete associated doses (but not the ingredients as they can be linked to other cocktails).

### 2 - Seed the ingredients

**Our app will not allow users to create ingredients**.
Instead, we will generate a static seed of ingredients to choose from.
Write this seed, for example

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice")
Ingredient.create(name: "mint leaves")
```

**Optional**: have fun and seed real ingredients using [this JSON list](http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list) (with `open-uri` and `json` ruby libs).

### 3 - Routing, Controller, Views for Cockatils

Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- A user can see the list of cocktails

```
GET "cocktails"
```

- A user can see the details of a given cocktail, with the dose needed for each ingredient

```
GET "cocktails/42"
```

- A user can create a new cocktail

```
GET "cocktails/new"
POST "cocktails"
```

### 4 - Routing, Controller, Views for Doses

- A user can add a new dose (ingredient/description pair) to an existing cocktail
- Checkout `simple_form` [docs](https://github.com/plataformatec/simple_form#associations) about `f.association` to easily create a select dropdown for our list of ingredients.

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- A user can delete a dose that belongs to an existing cocktail. How can we make a delete link again?

```
DELETE "doses/25"
```

Do we need an `IngredientsController`?

### 5 - Design as we go

Now time to make a nice front-end! Time to play around with CSS! 😊 Can you make it into the Hall of Fame? Go check out [dribbble](https://dribbble.com/) or [onepagelove](https://onepagelove.com/) for inspiration.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_1.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_2.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_3.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_4.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_1.png)

Don't forget you can have local images in the `app/assets/images` folder. Or even better, you can ask the user for an `image_url` on submission of the cocktail.

### 6 - New dose form on the cocktail show page (Optional)

Try to put the "New dose form" on the cocktail page, not on a separate page. What changes in the routes? And in the controllers?

### 7 - Select2 on the ingredients dropdown (Optional)

Let's try adding an npm package to our rails app! Let's follow the slides to see how to add `select2` to our ingredients dropdown.

### 8 - Let's add reviews for these awesome cocktails! (Optional)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_2.png)

### 9 - Going further

- Adding a possibility to search cocktails and adding `typed.js` to the search input field.
- Some nice [animate on scroll](https://michalsnik.github.io/aos/) animations for our list of cocktails as we scroll down the index.
