# TODO: Below are three questions for you to answer. Read each of the questions
# and make sure each of the methods `return` the correct answer.
# ⚠️ Try and answer them before running `rake`.

def crud_routes
  # TODO: Return a `Array` the 7 `actions` that `resources :restaurants` would generate for you.
  actions = []

  actions << 'index'
  # Add more actions here

  return actions
end

def nested_routes_for_n_to_n?
  # TODO: Return a `true` or `false` to answer this question:
  # If you have a many to many relationship between you models like `Restaurant` and `Review` (belongs_to :restaurant),
  # do you always have to nest all your routes for `Review` in `Restaurant`?

end

def validate_name
  # TODO: Return a `string` of the ActiveRecord validation need to make sure no record is
  # created without a name.

end
