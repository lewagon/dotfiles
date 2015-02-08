## Background & Objectives
Now it's time to make a 3-model app. Mister Cocktail, yeah!

## Specs

### Rails project kick-off

Everything is faster with a good setup, so here is your roadmap:

- Create your new Rails project with a good Postgres config

```
$ rails new mister_cocktail -T --database=postgresql
$ cd mister_cocktail
$ git init
$ git add .
$ git commit -m "rails new"
```

- Connect your project to a **Github repository**

```
$ hub create
$ git push -u origin master
```

- Deploy your app on Heroku **from t=0** (continuous deployment) by following this morning lecture.

- Setup your [Rails front-end](https://github.com/lewagon/stylesheets) to work with nice style from the beginning.


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
