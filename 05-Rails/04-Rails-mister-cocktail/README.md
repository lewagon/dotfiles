## Background & Objectives
Now it's time to make a 3-model app. Mister Cocktail, yeah!

## Specs

### Active Record Models

#### Attributes

- A cocktail has a name (e.g. "Mint Julep", "Whiskey Sour", "Mojito")
- An ingredient has a name (e.g. "lemon", "ice cubes", "mint leaves")
- A dose refers to a cocktail, an ingredient, and has an amount. E.g: the mint Julep has a dose of 3 mint leaves.

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

#### Validation

- A cocktail must have a name
- An ingredient must have a name
- A dose must have an amount

## Seed your ingredients

Our cocktails app will not allow users to create ingredients. This is a cocktail app, not an ingredient app :) Instead, we will generate a static seed for ingredients. Write this seed, for example

```ruby
# db/seeds.rb
Ingredient.create("lemon")
Ingredient.create("ice cubes")
Ingredient.create("mint leaves")
```

And launch it with `rake db:seed`.

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

## Developper Workflow

Don't forget to start your project the good way:

- Connecting it to a **Github repository**
- Pushing your app on **Heroku** from the beginning