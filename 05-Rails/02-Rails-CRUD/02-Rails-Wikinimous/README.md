## Background & Objectives

We want to build an anonymous wiki (like [this one](https://wagon-wikinimous.herokuapp.com)) where anyone can create a new article
or update an existing one.

## Model

Here is our schema:

```
+----------------+
| Article        |
+----------------+
| title (string) |
| content (text) |
+----------------+
```

Use the right rails generator to generate the `Article` model.

## Seed

Add the [`faker` gem](https://github.com/stympy/faker) to your `Gemfile` and
run `bundle install`. Use this gem to generate 10 fake articles in
`db/seeds.rb`. When your code is done, you can run:

```terminal
$ rake db:seed
```

## Controller & Views

Generate your model, and implement all 7 CRUD default actions to
list, show, create, update and destroy an article.

Once you're done, you should have a very nice wiki with all basic functionalities.

## Markdown (Optional, Ruby)

Add the [`redcarpet` gem](https://github.com/vmg/redcarpet) to your `Gemfile`
and run `bundle install`. We want to use the [Markdown syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to write our articles content.
Markdown is a simple and human-readable syntax which generates HTML. It is used
everywhere, especially on GitHub.

Store some Markdown in your articles, and use the `redcarpet` gem to display
the rendered text in the `show` view.

## Code Editor (Optional, JavaScript)

Use the [`ace-rails-ap` gem](https://github.com/codykrieger/ace-rails-ap) to
use the [ace editor](http://ace.c9.io) in place of the simple text area.

## Adding users (Optional, adding a model)

If you're happy with all the items below, and if a T.A. approved your code,
you may try this: adding a user sign in / sign up logic, and making sure
that you can edit an article iif you are logged in.

Here's a nice [gist](https://gist.github.com/thebucknerlife/10090014) on how
to use Bcrypt and `has_secure_password` in a Rails app. Next week, we'll see
Devise, a powerful auth system. Still it's nice to know how to do it by hand :)

## Versionning (Optional, adding a model - bis)

What about versionning your articles? Like Wikipedia, we'd like to store a new
version each time the "Save" button is pressed. Also, we'd like to have a page
listing all revisions for an article. What about diffs?


