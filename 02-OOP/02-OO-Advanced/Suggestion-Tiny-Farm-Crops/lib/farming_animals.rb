# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "cow"
require_relative "chicken"

# DO NOT remove the line below, written for display purpose
Board.new.display_title


puts "\n\n📝 Day Four: cows and chickens"


# TODO: Create your own story: add animals and have fun. This part is up to you!


barn = []
barn << Cow.new("Polly")
barn << Chicken.new("Edward", "male")
barn << Chicken.new("Daisy", "female")
barn << Chicken.new("Wendy", "female")

barn.each { |animal| puts "Read animal's collar: #{animal.collar}" }

puts "Time to feed the animals"
barn.each { |animal| puts animal.feed }

milk = barn.reduce(0) { |sum, animal| animal.instance_of?(Cow) ? sum + animal.milk : sum }
eggs = barn.reduce(0) { |sum, animal| animal.instance_of?(Chicken) ? sum + animal.eggs : sum }

puts "The cows produced #{milk} liters of milk"
puts "The chickens produced #{eggs} eggs"

barn.each { |animal| puts animal.talk }
