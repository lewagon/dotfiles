## Background & Objectives

Congrats, you are now an expert in ActiveRecord :) Let's take a step back from
what we've learnt so far:

- Store information in variables
- Define methods to implement generic behavior on arguments and reuse code
- Use several types, simple (`Fixnum`, `String`) or complex (`Hash`, `Array`)
- Use conditional branching with `if`
- Loop over collections with `for`, `while` or `Enumerable#each`

With that, we have the basics of any programming language. If you understand those
concepts, then you now are a programmer. And you can pick up really quickly any new language,
just by understanding how the stuff above works in the new one.

Well, we also learnt more complex stuff, to help us build big software.

- Class, to encapsulate data **and** behavior in an object
- MVC, to architect a software where classes have a single responsibility
- ActiveRecord, a layer on top of the database to abstract SQL queries

We are getting really close to Rails. What's missing, and you know it, is the View level.
We're supposed to build websites, not command line tools! Where's the HTML?

Well, let's play with [Sinatra](http://www.sinatrarb.com/intro.html) for a preview
of how awesome it will be!

## Setup

Install the following gems on your computer:

```bash
$ gem install sinatra sinatra-contrib
```

Then create and seed the DB with som posts.

```bash
$ rake db:create db:migrate db:seed
```

Launch the sinatra app.

```bash
$ ruby app.rb
```

Look! You can go to [http://localhost:4567](http://localhost:4567). You are
running a small webserver, and query it with your browser. No more command line!

## Some words about Sinatra

The `app.rb` file acts as the controller. The router layer is handled by Sinatra.
We already created a controller method to handle the root of the web app. Sinatra
maps the URL in the browser to the right method in `app.rb`, look at the [routing doc](http://www.sinatrarb.com/intro.html#Routes).

That's where you're going to fetch posts from the DB, and pass them to the view. With Sinatra and Rails,
passing stuff to the view is done for you through instance variables. Just set them, and you'll be able to use them in the view.

Views are ERB files. It's a special type of file where you mix HTML and Ruby. You can grasp the concept
by reading this [tutorial](http://www.stuartellis.eu/articles/erb/). Basically, you do two things:

```erb
<!-- Output some ruby string (like interpolation) -->
<%= @user.username %>
```

```erb
<!-- Loop over collections to outpu some ruby string again -->
<ul>
  <% @users.each do |user| %>
    <li><%= user.username %></li>
  <% end %>
</ul>
```

## Specs

This exercise is quite open, here are a few things you can start with:

- Display all posts on the homepage of the site
- Posts should be clickable, open a new tab and go to the website
- Display posts in descending vote order (see [`default_scope`](http://stackoverflow.com/questions/3393687/default-sort-order-for-a-rails-model))
- [Hard] Add a form at the top to submit a new post (hint: use a `post` route in `app.rb`)
- [Very Hard] Add a way to vote on a post

Have fun!
