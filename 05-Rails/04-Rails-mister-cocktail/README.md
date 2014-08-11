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

### Routing

Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- a user can see the list of all cocktails
- a user can see the details of a precise cocktail, with the table of ingredients and doses
- a user can create a new cocktail with its name.
- a user can add a new dose (ingredient/amount pair) on an existing cocktail
- a user can delete a dose on an existing cocktail

### Prepare for Deployment

When creating your new rails cocktail-app, do it properly setting the database to Postgres from the beginning, and tracking you project with git.


    $ cd ~/code/your_github_username
    $ rails new mistercocktail --database=postgresql
    $ cd mistercocktail
    $ git init
    $ git add . && git commit -m "rails new"
    $ rake db:create

Add to your Gemfile
```ruby
# Gemfile
ruby '2.1.1'
gem 'thin'
gem 'rails_12factor', group: :production
```

And run `bundle install`

Create a Procfile, in the app folder (same level as Gemfile), which includes this code

```ruby
# Procfile
web: bundle exec rails s -p $PORT
```

### Deploy continuously from the beginning
Once you have a Heroku account, you can create a Heroku app and push your code to this app.

Create the app on Heroku (the app name might be taken already..), with the addons flag heroku postgresql

    heroku create mistercoctail --addons heroku-postgresql --region eu

Now if you list your remote repos, you can see the heroku repo linked to your local repo.

    $ git remote -v

Every time you make a new commit, for example

    $ git add .
    $ git commit -m "some changes on my web-app"

You can push your changes on heroku directly with

    $ git push heroku master

Exactly the same process as with Github.


### Collaborate on Github

To host your code and collaborate on your project, Heroku will not be of any help.. So you still have to create a new Github repository and link it to your local repo. Your local cocktail-app now has 2 remote repositories (which you can check with `git remote -v`)

1. heroku = Production repo on Heroku
1. origin = Github repo to collaborate on your code

Hence you can push independently on these 2 repositories with

    $ git push origin master # push on Github
    $ git push heroku master # push to production on Heroku