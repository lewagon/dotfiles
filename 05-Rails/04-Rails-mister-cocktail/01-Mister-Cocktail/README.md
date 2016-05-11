## Background & Objectives

Now it's time to make a 3-model app. And you guessed it, we'll introduce
a `n:n` (many to many) relation. So what is it about? Well, it's a cocktail
manager. We want to store our best recipes of cocktails.

## Rails app generation

**Note**: You should be able to run those steps without this cheat sheet.

First let's create a new Rails app using PostgreSQL

```bash
cd ~/code/<user.github_nickname>
rails new rails-mister-cocktail -T --database=postgresql
cd rails-mister-cocktail
```

We then need to locally create the database for this new rails app.

```bash
rake db:create
```

Let's set up git, create a repo on GitHub and push our skeleton.

```bash
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

Let's import the teacher's spec to be able to `rake` our progress.

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
bundle install
rake db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.t spec
git add .
git commit -m "Prepare rails app with external specs"
```

You'll be able to test your code with:

```bash
rake db:migrate RAILS_ENV=test  # If you added a migration
rake                            # Launch tests
```

## Heroku deployment

Follow [the lecture's instructions](https://karr.lewagon.org/lectures/rails/04-hosting-deployment/#/1/12) about
preparing your app for being hosted on Heroku.

Then, in your terminal, create the app...

```bash
$ heroku create <user.github_nickname>-mister-cocktail --region eu
```

...and make your first deployment:

```bash
$ git push heroku master && heroku run rake db:migrate
```

## Style

Don't forget to use [lewagon/stylesheets](https://github.com/lewagon/rails-stylesheets)
to start from a good CSS architecture.

(commit and deploy this. You know the drill. **continuous deployment**)

## Specs

### Models

Go to [db.lewagon.org](http://db.lewagon.org) and draw the schema with your buddy. The tables
we need are `cocktails`, `ingredients` and `doses`.

Validate all models tests before moving to the routing layer. You can use this command:

```bash
rspec spec/models
```

to selectively run tests in the `spec/models` folder.

#### Attributes

- A **cocktail** has a name (e.g. `"Mint Julep"`, `"Whiskey Sour"`, `"Mojito"`)
- An **ingredient** has a name (e.g. `"lemon"`, `"ice"`, `"mint leaves"`)
- A **dose** references a cocktail, an ingredient and has a description. (e.g. the Mojito cocktail needs **6cl** of lemon)

#### Validation

- A cocktail must have a name, and names should be unique
- An ingredient must have a name, and names should be unique
- A dose must have a description, a cocktail and an ingredient, and [cocktail, ingredient] couples should be unique.

#### Associations

- A cocktail has many doses
- A cocktail has many ingredients through doses
- An ingredient has many doses
- A dose belongs to an ingredient
- A dose belongs to a cocktail
- You can't delete an ingredient if it used by at least one cocktail.
- When you delete a cocktail, you should delete associated doses (but not the ingredients as they can be linked to other cocktails).

### Seed the ingredients

**Our app will not allow users to create ingredients**.
Instead, we will generate a static seed of ingredients.
Write this seed, for example

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice")
Ingredient.create(name: "mint leaves")
```

### Routing

Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- A user can see the list of all cocktails

```
GET "cocktails"
```

- A user can see the details of a given cocktail, with the ingredient list

```
GET "cocktails/42"
```

- A user can create a new cocktail.

```
GET "cocktails/new"
POST "cocktails"
```

- A user can add a new dose (ingredient/description pair) on an existing cocktail.

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- A user can delete a dose on an existing cocktail

```
DELETE "doses/25"
```

And now think. Do we need an `IngredientsController`?


### Views

Now put a nice looking front-end on top of that :)

### Going further (Harder)

Try to put the "New dose form" on the cocktail page, not on a separate page.
