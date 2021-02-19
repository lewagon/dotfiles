# TODO: Below are three questions for you to answer. Read each of the questions
# and make sure each of the methods `return` the correct answer.
# WARNING: Try and answer them before running `rake`.

def restaurants_resources_routes
  # TODO: Return an `Array` with the 7 `routes` that `resources :restaurants` would generate for you.
  routes = []

  routes << "get '/restaurants', to: 'restaurants#index'"
  # Add more routes here

  return routes
end

def nested_routes_for_one_to_many?
  # TODO: Return a `true` or `false` to answer this question:
  # If you have a one to many relationship between your models like `Restaurant` and `Review` (belongs_to :restaurant),
  # do you always have to nest all your routes for `Review` in `Restaurant`?
end

def validate_name
  # TODO: Return a `string` of the ActiveRecord validation need to make sure no record is
  # created without a name. /!\ in Rails' context, a validation **is not** a String!
  # (it is only a String for the purpose of this exercise)
end
