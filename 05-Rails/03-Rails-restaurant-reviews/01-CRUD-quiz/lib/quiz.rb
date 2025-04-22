# TODO: Below are five questions for you to answer. Read each of the questions
# and make sure each of the methods return the correct answer.

def crud
  # TODO: The `Array` below has the four letters that make up the `CRUD`
  # acronym. Update each element of the array so that you write out the
  # four verbs that describe the CRUD actions.

  ['C', 'R', 'U', 'D']
end

def generate_model_command
  # TODO: Return a `String` with the command you would run in the terminal to
  # generate a `Restaurant` model that has two fields: name(`String`) and
  # stars(`Integer`).
end

def files_created_by_model_generator
  # TODO: Update the `Array` returned with the paths to the two files created
  # for you when run the model generator for a `Restaurant` model (from the
  # question above). Use `YYYYMMDDHHMMSS` for any timestamps.
  [
    '',
    ''
  ]
end

def crud_routing
  # TODO: There are seven `CRUD` routes that we need to know by heart. But
  # we don't want to write all of them in our routes. Return a `String` with
  # the single line we would add in `config/routes.rb` to add all seven CRUD
  # routes for our `Restaurant` model.
end

def controller_actions
  # TODO: If we have all seven CRUD routes, we will also need seven instance
  # methods in our `RestaurantsController`. Return an `Array` with the seven
  # controller actions that go along with the CRUD routes.
end
