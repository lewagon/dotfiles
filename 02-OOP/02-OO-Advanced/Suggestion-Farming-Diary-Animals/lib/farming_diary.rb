# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "cow"
require_relative "chicken"

# DO NOT remove the line below, written for display purpose
Board.new.display_title


puts "\n\n📝 Day Four: cows"


# TODO: Create a new `Cow` and feed it. Check how much milk you have.
rebecca = Cow.new("Rebecca")
rebecca.feed

puts "#{rebecca.name} produced #{rebecca.milk} liter(s) of milk"

# TODO: check the other methods of your cow
rebecca.hug
rebecca.talk



puts "\n\n📝 Day Five: chickens"

# TODO: create chickens and test their methods
laura = Chicken.new('Laura', 'female')
germain = Chicken.new('Germain', 'male')

laura.feed
puts "#{laura.name} produced #{laura.eggs} egg(s)"
laura.talk
laura.hug

germain.feed
puts "#{germain.name} produced #{germain.eggs} egg(s)"
germain.talk
germain.hug



puts "\n\n📝 Day Six: taking care of the animals"
# TODO: Create your own story: add animals and have fun. This part is up to you!


animals = [rebecca, laura, germain]
animals.each { |animal| animal.feed }

milk = animals.reduce(0) { |sum, animal| animal.instance_of?(Cow) ? sum + animal.milk : sum }
eggs = animals.reduce(0) { |sum, animal| animal.instance_of?(Chicken) ? sum + animal.eggs : sum }

puts "The cows produced #{milk} liters of milk"
puts "The chickens produced #{eggs} eggs"

animals.each { |animal| animal.talk }
