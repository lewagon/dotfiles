# DO NOT remove this line, written for testing purpose
require_relative "../spec/helper/display"
require_relative "crop"
require_relative "animal"


# Create an array named `field` to plant your corn
field = []

# Create 3 `Corn` instances and put them into `field`
3.times do
  field << Corn.new
end

# Inspect `field` to see the instances of `Corn`
p field

# Water and weed all the corns
field.each do |corn|
  corn.water!
  corn.weed!
end

# Count all the corn grains, display the result with a puts
puts field.reduce(0) { |sum, corn| sum + corn.grains }


# Add 4 `Rice` crops to your `field`
4.times do
  field << Rice.new
end

# Water all the crops (corn and rice)
field.each { |crop| crop.water! }

puts field.reduce(0) { |sum, corn| sum + corn.grains }

p field

barn = []

polly = Cow.new("Polly")
barn << polly
edward = Chicken.new("Edward", "male")
barn << edward

barn.each { |animal| animal.feed! }



# DO NOT remove this line, written for testing purpose
@variables = Hash[local_variables.collect { |v| [v, binding.local_variable_get(v)] }]
display_board