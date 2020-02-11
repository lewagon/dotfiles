## Background & Objectives

Before we move on to looking at a rails app with the basic CRUD features, lets review some of the principles we saw yesterday when we looked at routing, controllers & views.

## Specs

Look at the `lib/quiz.rb` file. You will find a quiz with a few methods
to test your rails knowledge so far. Make sure each of the methods returns
the correct information to pass the quiz!
⚠️ Try and answer them before running `rake`.

### Question 1

Return a `String` with the command you would run in your terminal
to launch a rails server so that you could visit your your app in development
at `http://localhost:3000`.

### Question 2

You will find three variables defined with the three different
steps required to add a new page to your rails app. Add these variables
to the `Array` returned so that these steps are in the correct order.

### Question 3

If you want to add an about page to your rails app, you will
first need to add a new route. Return a `String` with the line you would
add to your `config/routes.rb` file, so that you could visit your page
at `localhost:3000/about` (you will need to specify the controller and
action somehow....).

### Question 4

Return a `String` with the command you would run in the terminal to
generate a `pages` controller, with an `about` action.

### Question 5

Return a `String` with the file path (from the root of your rails
application) to the view corresponding to the controller action generated
in the question above (the `about` action, in the `pages` controller).


## Key learning points

- Know the steps for adding a new page to your Rails application.
- How do we generate new controllers in our application?
- What are the conventions we must follow when working with Rails?
