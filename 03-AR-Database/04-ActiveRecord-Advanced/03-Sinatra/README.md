## Background & Objectives

Congrats, you are now an expert in Active Record 😊 Let's take a step back from what we've learnt so far since the very first day and the setup:
- Store information in variables
- Define methods to implement generic behavior on arguments and reuse code
- Use several types, simple (`Integer`, `String`) or complex (`Hash`, `Array`)
- Use conditional branching with `if`
- Loop over collections with `for`, `while` or `Enumerable#each`

Now you know all of that, you have the basics of any programming language. If you understand those concepts, then you now are a programmer, and you'll be able to pick up any new object-oriented language really quickly. All you'd have to do would be to understand how the stuff above worked. Once you know that, it's a new syntax, not new concepts.

Now though, you'll start covering more complex stuff that will help us build bigger, more complicated software.

- Class - to encapsulate **data** and **behavior** in an object
- **MVC** - to build software where each class has a single responsibility
- Active Record - a layer on top of the database to abstract SQL queries (write Ruby code instead of SQL)

We are getting reaaaally close to Rails now :) There's one thing missing though - and you know it - it's the View level. We're here to build websites, not command line tools! Where's the HTML?! CSS?!

Let's play with the [Sinatra](http://www.sinatrarb.com) gem for a preview of how awesome it will be!

## Setup

Install the gems specified in your `Gemfile` with the following command:

```bash
bundle install
```

We've given you the migration and the seed already. Run them with:

```bash
rake db:drop db:create db:migrate db:seed
```

Launch the Sinatra app.

```bash
ruby lib/app.rb
```

Look! You can go to [http://localhost:4567](http://localhost:4567). You are now running a small webserver and are accessing it with your browser. No more command line!

## Some words about Sinatra

The `app.rb` file acts as the controller. The router layer is handled by Sinatra. We already created a controller method to handle the root of the web app. Sinatra maps the URL in the browser to the right method in `app.rb`. Take a look at the [routing doc](http://www.sinatrarb.com/intro.html#Routes) for more info.

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

## ERB

Have you heard about **templating**? It's a way to write HTML in which you can inject data **dynamically** using code.

In a Ruby framework like Sinatra, we can use **erb** which stands for embedded Ruby.

The syntax is the following:

```erb
<% first_name = "Boris" %>

<h1>Hello, I'm <%= first_name %></h1>
```

Use `<% %>` for code you **don't want to display**, and `<%= %>` when you want to **inject** the output in the HTML.

Commonly, you will define variables in your controller:

```ruby
get '/' do
  @first_name = "Boris" # <-- notice the `@` to make it available in the view!
  erb :home
end
```

And use it in your `home.erb` view:

```erb
<h1>Hello, I'm <%= @first_name %></h1>
```

Make sure you define **instance variables with an `@`** in your controller for variables you want to use in your views!

**Rails will use erb too!** So take the time to read [this section](https://github.com/lewagon/sinatra-101#passing-stuff-to-the-view) thoroughly.

## Specs

This exercise is quite open, here are a few things you can start with:
- Display all posts on the homepage of the site
- Each post should be clickable. The click will open a new tab and go to the website
- Display posts in descending vote order (see [`scopes`](http://guides.rubyonrails.org/active_record_querying.html#scopes))
- [Hard] Add a form at the top to submit a new post (hint: use a `post` route in `app.rb`)
- [Very Hard!] Add a way to vote on a post.

Have fun!

There are no tests for this exercise, so `rake` will just run Rubocop to make sure you've got good style ;)

### Sharing

Feel free to share you work on Slack with [`ngrok`](https://ngrok.com/). Install `ngrok` (with `brew install --cask ngrok` or [manually for Ubuntu](https://ngrok.com/download)), and run it in another window.

```bash
ngrok http 4567
```

Make sure your URL is public (`*.ngrok.com`) so you can share with everybody!
