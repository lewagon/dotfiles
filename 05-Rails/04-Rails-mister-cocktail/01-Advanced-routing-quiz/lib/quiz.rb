# TODO: Below are five questions for you to answer. Read each of the questions
# and make sure each of the methods return the correct answer.

def crud_routes
  # TODO: Return a `Array` all the `actions` that `resources :restaurants` would generate for you.
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

def top
  # TODO: Assuming you are in your `RestaurantsController` and that you have this in your routes:

  # resources :restaurants do
  #   collection do                       # collection => no restaurant id in URL
  #     get 'top', to: "restaurants#top"  # RestaurantsController#top
  #   end
  # end

  # how those
end

def chef
  # TODO: Return a `string` of what you have to add you your `routes`
  # in order to have a route like this: `GET /restaurants/1/chef` that would
  # show info about a chef of a specific restaurant of your website.

end

def naming_conventions
  # TODO: Return a `string` with the file path (from the root of you rails
  # application) to the view corresponding to the controller action generated
  # in the question above (the `about` action, in the `pages` controller).
end
