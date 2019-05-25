## Background & Objectives

Before we move on to looking beyond CRUD, lets review some of the principles we saw yesterday when we looked at Models & CRUD.

## Specs

Look at the `lib/quiz.rb` file. You will find a quiz with a few methods
to test your rails knowledge so far. Make sure each of the methods returns
the correct information to pass the quiz!
⚠️ Try and answer them before running `rake`.

### Question 1

The `Array` shown has the four letters that make up the `CRUD`
acronym. Update each element of the array so that you write out the
four verbs that describe the CRUD actions.

### Question 2

Return a `String` with the command you would run in the terminal to
generate a `Restaurant` model that has two fields: name(`String`) and
stars(`Integer`).

### Question 3

Update the `Array` returned with the paths to the two files created
for you when run the model generator for a `Restaurant` model (from the
question above). Use `YYYYMMDDHHMMSS` for any timestamps.

### Question 4

There are seven `CRUD` routes that we need to know by heart. But
we don't want to write all of them in our routes. Return a `String` with
the single line we would add in `config/routes.rb` to add all seven CRUD
routes for our `Restaurant` model.

### Question 5

If we have all seven CRUD routes, we will also need seven instance
methods in our `RestaurantsController`. Return an `Array` with the seven
controller actions that go along with the CRUD routes.


## Key learning points

- Know the basics of CRUD routing
- How do we generate new models in our application?
