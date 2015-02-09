## Background & Objectives

Now it's time to make a 3-model app. And you guessed it, we'll introduce
a `n:n` (many to many) relation.

## Rails app generation

**Note**: You should be able to run those steps without this cheat sheet.

First let's create a new Rails app using PostgreSQL

```bash
$ cd ~/code/<user.github_nickname>
$ rails new mister-cocktail -T --database=postgresql
$ cd mister-cocktail
```

We then need to locally create the database for this new rails app.

```bash
$ rake db:create
```

Let's set up git, create a repo on GitHub and push our skeleton.

```bash
$ git init
$ git add .
$ git commit -m "rails new"
$ hub create
$ git push origin master
```

Let's import the teacher's spec to be able to `rake` our progress.

```bash
$ echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
$ bundle install
$ git submodule add git@github.com:lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.git spec
$ git add .
$ git commit -m "Prepare rails app with external specs"
```

## Heroku deployment

Follow [the lecture's instructions](http://karr.lewagon.org/lectures/rails/04-hosting-deployment/#/1/12) about
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

Don't forget to use [lewagon/stylesheets](https://github.com/lewagon/stylesheets)
to start from a good CSS architecture.

(commit and deploy this. You know the drill. **continuous deployment**)

## Specs

### Active Record Models

#### Attributes

- A cocktail has a name (e.g. "Mint Julep", "Whiskey Sour", "Mojito")
- An ingredient has a name (e.g. "lemon", "ice cubes", "mint leaves")
- A dose refers to a cocktail, an ingredient, and has an amount. E.g: the mint Julep has a dose of 3 mint leaves.

#### Validation

- A cocktail must have a name
- An ingredient must have a name
- A dose must have an amount

Test your validations on Rails console before moving on.

#### Associations

- A cocktail has many doses
- A cocktail has many ingredients through doses
- An ingredient has many doses
- An ingredient has many cocktails through doses
- A dose belongs to an ingredient
- A dose belongs to a cocktail
- When you delete an ingredient, it should delete the related doses.
- When you delete a cocktail, you should delete associated doses (you will not destroy the ingredients as they can be linked to other cocktails).

Again, the `dependent: :destroy` option for associations will help.
As you have guessed, the `doses` table is the join table between cocktails and ingredients.

Again, test your associations on Rails console before moving on. Example:

```
$ mojito = Cocktail.create(name: "Mojito")
$ mint = Ingredient.create(name: "mint leaves")
$ dose = Dose.new()
$ dose.cocktail = mojito
$ dose.ingredient = mint
$ dose.amount = 3
$ dose.save
$ mojito.ingredients  # Should contain mint
$ mint.cocktails      # Should contain mojito
```

## Seed your ingredients

Our cocktails app will not allow users to create ingredients. This is a cocktail app, not an ingredient app. Instead, we will generate a static seed for ingredients. Write this seed, for example

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice cubes")
Ingredient.create(name: "mint leaves")
```

run it with `rake db:seed`.

### Routing

Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- a user can see the list of all cocktails

```
GET "cocktails"
```

- a user can see the details of a precise cocktail, with the table of ingredients and doses

```
GET "cocktails/42"
```

- a user can create a new cocktail.

```
GET "cocktails/new"
POST "cocktails"
```

- a user can add a new dose (ingredient/amount pair) on an existing cocktail

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- a user can delete a dose on an existing cocktail

```
DELETE "doses/25"
```
