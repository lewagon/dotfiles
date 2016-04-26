## Background & Objectives

Congrats, you are now an expert in ActiveRecord :) Let's take a step back from
what we've learnt so far since the very first day and the setup:

- Store information in variables
- Define methods to implement generic behavior on arguments and reuse code
- Use several types, simple (`Fixnum`, `String`) or complex (`Hash`, `Array`)
- Use conditional branching with `if`
- Loop over collections with `for`, `while` or `Enumerable#each`

With that, we have the basics of any programming language. If you understand those concepts, then you now are a programmer. And you can pick up really quickly any new object oriented language, just by understanding how the stuff above works in the new one. You'd have to learn a new syntax, not new concepts.

You also learnt more complex stuff, to help us build big software.

- Class, to encapsulate **data** and **behavior** in an object
- **MVC**, to architect a software where classes have a single responsibility
- ActiveRecord, a layer on top of the database to abstract SQL queries (write Ruby code instead of SQL)

We are getting really close to Rails. What's missing, and you know it, is the View level.
We're supposed to build websites, not command line tools! Where's the HTML?! CSS?!

Let's play with the [Sinatra](http://www.sinatrarb.com) gem for a preview of how awesome it will be!

## Setup

Install the gems specified in your `Gemfile` with the following command:

```bash
$ bundle install
```

We already give you the migration and the seed. Run them with:

```bash
$ rake db:drop db:create db:migrate db:seed
```

Launch the sinatra app.

```bash
$ ruby app.rb
```

Look! You can go to [http://localhost:4567](http://localhost:4567). You are running a small webserver and query it with your browser. No more command line!

## Some words about Sinatra

The `app.rb` file acts as the controller. The router layer is handled by Sinatra.
We already created a controller method to handle the root of the web app. Sinatra maps the URL in the browser to the right method in `app.rb`, look at the [routing doc](http://www.sinatrarb.com/intro.html#Routes).

```ruby
# app.rb
# [...]

get '/' do  # <- Router part

  # [...]   #
  # [...]   # <- Controller part
  # [...]   #

end
```

Read about Views, Routing, `params` [here](https://github.com/lewagon/sinatra-101#views) before starting coding.

## Specs

This exercise is quite open, here are a few things you can start with:

- Display all posts on the homepage of the site
- Posts should be clickable, open a new tab and go to the website
- Display posts in descending vote order (see [`scopes`](http://guides.rubyonrails.org/active_record_querying.html#scopes))
- [Hard] Add a form at the top to submit a new post (hint: use a `post` route in `app.rb`)
- [Very Hard] Add a way to vote on a post.

Have fun!

There's no tests for this exercice, so `rake` will just run Rubocop do make sure you have a good style.

### Sharing

Don't hesitate to share you work on Slack with [`ngrok`](https://ngrok.com/). Install `ngrok` (with `brew cask install ngrok` or [manually for Ubuntu](https://ngrok.com/download)), and run it
in another window.

```bash
$ ngrok http 4567
```

You should get a publicly browsable URL (`*.ngrok.com`) to share with everybody!
