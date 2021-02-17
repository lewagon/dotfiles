# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "rice"
require_relative "corn"
require_relative "cow"
require_relative "chicken"

# Arrays: fields and buildings to plant the crops and shelter the animals
field = []
barn = []

action = ""
until action == "quit"

  # DO NOT remove the line below, written for display purpose
  Board.new.display

  # Menu
  puts "To take care of your farm, you can:"
  puts "Crops    [ rice | corn | water | transplant ]"
  puts "Animals  [ cow | chicken | feed ]"
  puts "Farm     [ quit ]"
  puts "What do you want to do ?"
  print "> "

  action = gets.chomp
  case action
  when "rice"
    # TODO: instanciate a Rice crop and add it to the array `field`
    field << Rice.new
  when "corn"
    # TODO: instanciate a `Corn` crop and add it to the array `field`
    field << Corn.new
  when "water"
    # TODO: call the `water!` method on all instances of `Crop`
    field.each { |crop| crop.water! }
  when "transplant"
    # TODO: call the `transplant` method on all instances of `Rice`
    field.each { |crop| crop.transplant! if crop.instance_of? Rice }
  when "cow"
    # TODO: ask for a name, create a `Cow` and add it to the array `barn`
    puts "Name the cow"
    print "> "
    name = gets.chomp
    barn << Cow.new(name)
  when "chicken"
    # TODO: ask for a name, instanciate a `Chicken` and add it to the array `barn`
    # TODO: chickens can be female or male, pick at random
    gender = ["female", "male"].sample
    puts "The chicken is a #{gender}"
    puts "Name the chicken"
    print "> "
    name = gets.chomp
    barn << Chicken.new(name, gender)
  when "feed"
    # TODO: feed all the animals
    barn.each { |animal| animal.feed }
  when "quit"
    puts "See you next time"
  else
    puts "I don't know what you mean..."
  end
end
