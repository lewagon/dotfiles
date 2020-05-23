# def burger(steak, sauce, topping)
#   steak = (block_given? ? yield(steak) : steak)
#   ["bread", steak, sauce, topping, "bread"]
# end


##################################################################
# TODO: append blocks to the method calls                        #
# - they take a string as a parameter                            #
# - they return a string modified according to the instructions  #
##################################################################

# TODO: append a block to transform a string to uppercase
grilled_classical_burger = burger("steak", "ketchup", "onions")
# grilled_classical_burger = burger("STEAK", "ketchup", "onions") do |ingredient|
#   ingredient.upcase
# end

# TODO: append a block to replace any vowel by the sign "~"
juicy_classical_burger = burger("steak", "ketchup", "onions")
# juicy_classical_burger = burger("steak", "ketchup", "onions") do |ingredient|
#   ingredient.tr("aeiou", "~")
# end

# TODO: append a block to replace the string "steak" by "tofu"
vegan_burger = burger("steak", "ketchup", "onions")
# vegan_burger = burger("steak", "ketchup", "onions") do |ingredient|
#   ingredient == "steak" ? "tofu" : ingredient
# end

# TODO: append a block to add the sign "*" before and after the string
salty_classical_burger = burger("steak", "ketchup", "onions")
# salty_classical_burger = burger("steak", "ketchup", "onions") do |ingredient|
#   "*#{ingredient}*"
# end




# DO NOT remove this line, written for testing purpose
@local_variables = Hash[local_variables.collect { |v| [v, binding.local_variable_get(v)] }]
