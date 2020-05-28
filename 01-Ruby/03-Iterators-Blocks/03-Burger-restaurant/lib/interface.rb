require_relative "burger_restaurant"


#################################################
# TODO: prepare burgers for the customers below #
#       fill the variables                      #
#################################################

# TODO: A simple burger
# No block in this one, just a simple method call
puts "💬 I'd like a burger with steak, ketchup and onions, please."
# simple_burger = uncomment and call the `burger` method here




# TODO: A bigger burger
# Block hint: to upgrade a portion to a bigger one, transform the string to upercase
puts "💬 A burger with a bigger portion of fish, plus mayo and salad please."
# bigger_burger = uncomment and call the `burger` method here




# TODO: A juicy burger
# Block hint: to make a juicy meat, replace any vowel by the sign "~"
puts "💬 A juicy chicken burger with barbecue sauce and cheddar, please."
# juicy_burger = uncomment and call the `burger` method here




# TODO: A vegan burger
# Block hint: replace the string any meat string by "salad"
puts "💬 I'm vegan, I'd like to replace meat by salad"
# vegan_burger = uncomment and call the `burger` method here




# TODO: A spicy burger
# Block hint: to make a spicy portion, add the sign "*" before and after the string
puts "💬 I'd like a spicy chicken with ketchup and cheddar"
# spicy_burger = uncomment and call the `burger` method here





# DO NOT remove this line, written for testing purpose
@local_variables = Hash[local_variables.collect { |v| [v, binding.local_variable_get(v)] }]
