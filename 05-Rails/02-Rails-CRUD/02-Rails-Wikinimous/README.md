## Background & Objectives

We want to build an anonymous wiki (like [this one](https://wagon-wikinimous.herokuapp.com)) where anyone can create a new article
or update an existing one.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-wikinimous
cd rails-wikinimous
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

## Specs

### 1 - Model

Here is our schema:

```
+----------------+
| Article        |
+----------------+
| title (string) |
| content (text) |
+----------------+
```

Use the right rails generator to generate the `Article` model with the correct fields.

### 2 -Seed

Add the [`faker` gem](https://github.com/stympy/faker) to your `Gemfile` and
run `bundle install`. Use this gem to generate 10 fake articles in
`db/seeds.rb`. When your code is done, you can run:

```bash
rails db:seed
```

### 3 - Controller & Views

Generate your controller, and implement all 7 CRUD default actions to
list, show, create, update and destroy an article, like we did for the task manager.

You can now directly use the `resources` shortcut in your routes.

Have a look at the [live app](https://wagon-wikinimous.herokuapp.com) to see what it should look like. 😉
