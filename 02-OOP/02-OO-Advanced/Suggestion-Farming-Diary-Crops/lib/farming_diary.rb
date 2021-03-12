# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "rice"
require_relative "corn"

# DO NOT remove the line below, written for display purpose
Board.new.display_title




puts "\n\n📝 Day One: planting corn"

# TODO: Create one `Corn` instance
corn = Corn.new

puts "Today, I planted 1 corn crop in the field"

# TODO: Water the corn crop
corn.water!

# TODO: Replace the missing value with a dynamic variable
puts "After a good watering, the corn crop produced #{corn.grains} grains"

# TODO: Replace the dots with 'not' if the crop is not ripe
puts "The corn crop is #{'not ' unless corn.ripe?}ripe"




puts "\n\n📝 Day Two: planting rice"

# TODO: Plant rice
rice = Rice.new

puts "Today, I planted 1 corn crop in the field"

# TODO: Transplant and water the rice crop
rice.transplant!
rice.water!

# TODO: Replace the missing value with a dynamic variable
puts "After a transplant and a good watering and, the rice crop produced #{rice.grains} grains"

# TODO: Replace the dots with 'not' if the crop is not ripe
puts "The rice crop is #{'not ' unless rice.ripe?}ripe"



puts "\n\n📝 Day Three: taking care of the crops"

# TODO: create an array `crops`. Put the corn and the rice crops in it
crops = [corn, rice]

# TODO: Water all the crops at once (Corn and Rice). Remember they both have the `water!` method
crops.each { |crop| crop.water! }

# TODO: Count the total grains
grains = crops.reduce(0) { |sum, crop| sum + crop.grains }
puts "I watered all the crops (rice and corn) and they produced #{grains} grains"

# TODO: Check if all the crops are ripe
ripe = crops.all? { |crop| crop.ripe? }
puts "The crops are #{'not ' unless ripe}ripe"
