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

Before starting to code, don't forget to setup your Rails app for Frontend, like in this morning's lecture let's add the gems we're going to need:

```ruby
# Gemfile
gem 'autoprefixer-rails'
gem 'bootstrap-sass', '~> 3.3.7'
gem 'font-awesome-sass', '~> 5.0.9'
gem 'simple_form'
```

```bash
bundle install
rails generate simple_form:install --bootstrap
```

Then let's download the Le Wagon's stylesheets:

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/rails-stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm -f stylesheets.zip && rm -f app/assets/rails-stylesheets-master/README.md
mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

To enable Bootstrap responsiveness you will also need to add the following to your `<head>`:

```html
<!-- app/views/layouts/application.html.erb -->

<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <!-- [...] -->
```

Finally let's also add the Bootstrap JavaScript library:

```bash
# In the terminal:
yarn add jquery bootstrap@3
```

```js
// config/webpack/environment.js
const { environment } = require('@rails/webpacker')

// Bootstrap 3 has a dependency over jQuery:
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
)
module.exports = environment
```
```js
// app/javascript/packs/application.js
import 'bootstrap';
```
Make sure you are importing the JavaScript in the `application.html.erb`, note that the JS scripts should be a the bottom of the file (for performance and only when the DOM is loaded), also you can create several packs and import them where you need them!

```html
<!-- app/views/layouts/application.html.erb -->

  <!-- [...] -->

  <%= javascript_include_tag "application" %> <!-- from app/assets/javascripts/application.js -->
  <%= javascript_pack_tag "application" %>    <!-- from app/javascript/packs/application.js -->
</body>
```

Don't forget to `commit` and `push` your work often.

## Specs

### 1 - Models

Go to [db.lewagon.com](http://db.lewagon.com) and draw the schema with your buddy. The tables
we need are `cocktails`, `ingredients` and `doses`. Think about the relations between the tables and who is storing the *references*. 😉

**Important**
Don't use `rake` but:

```bash
rspec spec/models
```

to only run tests in the `spec/models` folder. Make sure they're all green before moving on to the applicative part of the challenge.

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

**Important**
Don't use `rake` to code the applicative part. It's time to launch a `rails s` in your terminal and open a browser at [http://localhost:3000/](http://localhost:3000/). Always code in silo:

- start with the **route**,
- then start coding the **controller**,
- start coding the **view** and refresh your browser.

When your feature is done (and looks good), move on to the next one and repeat the process!

When you think you're done with the **whole** challenge, use `rake` to make sure it satisfies the specs.

**Features**
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
