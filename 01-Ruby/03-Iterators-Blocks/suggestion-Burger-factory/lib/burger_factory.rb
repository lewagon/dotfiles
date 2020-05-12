# TODO : write the `burger_factory` method
# - it takes 3 arguments
# - it returns an array

def burger_factory(recipe, sauce, topping)
  # burger = []
  # burger << "bread"
  # burger << (block_given? ? yield(recipe) : recipe)
  # burger << sauce
  # burger << topping
  # burger << "bread"
  # return burger
  recipe = (block_given? ? yield(recipe) : recipe)
  ["bread", recipe, sauce, topping, "bread"]
end

classical_burger = burger_factory("steak", "ketchup", "tomato")

nuggets_burger = burger_factory("NUGGETS", "CAESAR", "ONIONS") do |ingredient|
  ingredient.downcase
end

mayo_burger = burger_factory("chicken", "barbecue", "onions") do |ingredient|
  ingredient.tr("aeiou", "~")
end

spicy_burger = burger_factory("fish", "cream", "tomato") do |ingredient|
  "* #{ingredient.upcase} *"
end

# vegan = burger_factory("verde", "salad", "steak") do |ingredient|
#   if (ingredient == "steak")
#     "tofu"
#   else
#     ingredient
#   end
# end

# DO NOT remove this line, written for testing purpose
@local_variables = Hash[local_variables.collect { |v| [v, binding.local_variable_get(v)] }]
