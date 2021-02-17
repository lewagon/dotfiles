# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "cow"
require_relative "chicken"

# DO NOT remove the line below, written for display purpose
Board.new.display_title


puts "\n\n📝 Day Four: cows"


# TODO: Create a new `Cow` and feed it. Check how much milk you have.
rebecca = Cow.new("Rebecca")
puts rebecca.feed

puts "#{rebecca.name} produced #{rebecca.milk} liter(s) of milk"

# TODO: check the other methods of your cow
puts rebecca.collar
puts rebecca.talk



puts "\n\n📝 Day Five: chicken"

# TODO: create chickens and test their methods
laura = Chicken.new('Laura', 'female')
germain = Chicken.new('Germain', 'male')

puts laura.feed
puts "#{laura.name} produced #{laura.eggs} egg(s)"
puts laura.collar
puts laura.talk

puts germain.feed
puts "#{germain.name} produced #{germain.eggs} egg(s)"
puts germain.collar
puts germain.talk

# TODO: Create your own story: add animals and have fun. This part is up to you!


barn = []
barn.each { |animal| puts "Read animal's collar: #{animal.collar}" }

puts "Time to feed the all the animals"
barn.each { |animal| puts animal.feed }

milk = barn.reduce(0) { |sum, animal| animal.instance_of?(Cow) ? sum + animal.milk : sum }
eggs = barn.reduce(0) { |sum, animal| animal.instance_of?(Chicken) ? sum + animal.eggs : sum }

puts "The cows produced #{milk} liters of milk"
puts "The chickens produced #{eggs} eggs"

barn.each { |animal| puts animal.talk }
