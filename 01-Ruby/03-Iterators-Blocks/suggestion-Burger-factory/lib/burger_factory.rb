########################################
# TODO: write the `cook_burger` method #
# - it takes 3 arguments               #
# - it returns an array of strings     #
########################################


def cook_burger(recipe, sauce, topping)
  # burger = []
  # burger << "bread"
  # burger << (block_given? ? yield(recipe) : recipe)
  # burger << sauce
  # burger << topping
  # burger << "bread"
  # return burger
  recipe = (block_given? ? yield(recipe) : recipe)
  sauce = (block_given? ? yield(sauce) : sauce)
  topping = (block_given? ? yield(topping) : topping)
  ["bread", recipe, sauce, topping, "bread"]
end



##################################
# TODO: fill the variables below #
##################################

# classical_burger = # TODO: call `cook_burger` with ingredients "steak", "ketchup" and "tomato"
classical_burger = cook_burger("steak", "ketchup", "onions")


bigger_classical_burger = cook_burger("STEAK", "ketchup", "onions") do |ingredient|
  ingredient.upcase
end


classical_burger_with_mayo = cook_burger("steak", "ketchup", "onions") do |ingredient|
  ingredient.tr("aeiou", "~")
end


vegan_burger = cook_burger("steak", "ketchup", "onions") do |ingredient|
  ingredient == "steak" ? "tofu" : ingredient
end





# DO NOT remove this line, written for testing purpose
@local_variables = Hash[local_variables.collect { |v| [v, binding.local_variable_get(v)] }]
