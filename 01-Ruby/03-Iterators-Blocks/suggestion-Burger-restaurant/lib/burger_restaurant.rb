##################################
# TODO: code the `burger` method #
##################################

def burger(ingredient, sauce, topping)
  ingredient = (block_given? ? yield(ingredient) : ingredient)
  ["bread", ingredient, sauce, topping, "bread"]
end
