# DO NOT remove the line below, written for display purpose
require_relative "../spec/helper/board"

require_relative "rice"
require_relative "corn"
require_relative "cow"
require_relative "chicken"

crops = []
animals = []

action = ""
until action == "quit"

  # Move the line below in the loop when asked
  Board.new.display

  puts "Pick an action: [corn | rice | water | cow | chicken | feed | quit]"
  print "> "

  action = gets.chomp
  case action
  when "corn"
    crops << Corn.new
  when "rice"
    crops << Rice.new
  when "water"
    crops.each { |crop| crop.water! }
  when "cow"
    puts "Name the cow"
    print "> "
    name = gets.chomp
    animals << Cow.new(name)
  when "chicken"
    gender = ["female", "male"].sample
    puts "The chicken is a #{gender}"
    puts "Name the chicken"
    print "> "
    name = gets.chomp
    animals << Chicken.new(name, gender)
  when "feed"
    animals.each { |animal| animal.feed! }
  when "quit"
    puts "See you next time"
  else
    puts "I don't know what you mean..."
  end
end
