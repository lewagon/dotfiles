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

## Markdown (Hard)

Add the [`redcarpet` gem](https://github.com/vmg/redcarpet) to your `Gemfile`
and run `bundle install`. We want to use the [Markdown syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to write our articles content.
Markdown is a simple and human-readable syntax which generates HTML. It is used
everywhere, especially on GitHub.

Store some Markdown in your articles, and use the `redcarpet` gem to display
the rendered text in the `show` view.

## Code Editor (Very Hard, JavaScript)

Use the [`ace-rails-ap` gem](https://github.com/codykrieger/ace-rails-ap) to
use the [ace editor](http://ace.c9.io) in place of the simple text area.


