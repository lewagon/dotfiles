require_relative "crop"
require_relative "animal"
require_relative "../spec/helper/display"

# Arrays: fields and buildings to plant the crops and shelter the animals
corn_field = []
rice_field = []
barn = [] # building for the cows
coop = [] # building for the chickens


# TODO: enlever days
def one_day_passes(farm_items)
  # TODO: make each crop and each animal age one day
  farm_items.each { |farm_item| farm_item.one_day_passes! }
end


action = ""
until action == "quit"
  one_day_passes(corn_field + rice_field + barn + coop)
  display_board(corn_field, rice_field, barn, coop) # For display purpose only. Please don't modify!

  # Menu
  puts "To take care of your farm, you can:"
  puts "Crops    [ corn | rice | irrigate ]"
  puts "Animals  [ cow | chicken | talk ]"
  puts "Farm     [ inventory | quit ]"
  puts "What do you want to do ?"
  print "> "

  action = gets.chomp
  case action
  when "corn"
    # TODO: instanciate a `Corn` crop and add it to the array `corn_field`
    corn_field << Corn.new
  when "rice"
    # TODO: instanciate a Rice crop and add it to the array `rice_field`
    rice_field << Rice.new
  when "irrigate"
    # TODO: call the `irrigate!` method on all instances of `Rice`
    rice_field.each { |rice| rice.irrigate! }
  when "cow"
    # TODO: ask for a name, create a `Cow` and add it to the array `barn`
    puts "Name the cow"
    print "> "
    name = gets.chomp
    barn << Cow.new(name)
  when "chicken"
    # TODO: ask for a name, instanciate a `Chicken` and add it to the array `coop`
    # TODO: chickens can be female or male, pick at random
    puts "Name the chicken"
    print "> "
    name = gets.chomp
    coop << Chicken.new(name, ["female", "male"].sample)
  when "talk"
    # TODO: make all the animals talk
    (barn + coop).each do |animal|
      puts " - #{animal.name} says #{animal.talk}"
    end
    puts "(Press ENTER to continue)"
    gets.chomp
  when "inventory"
    # TODO: display the inventory of the farm (total grains, milk and eggs)
    grains = (corn_field + rice_field).reduce(0) { |sum, crop| sum + crop.grains }
    milk = barn.reduce(0) { |sum, cow| sum + cow.milk}
    eggs = coop.reduce(0) { |sum, chicken| sum + chicken.eggs}
    puts "You have a total of:"
    puts " - #{grains} grains"
    puts " - #{milk} milk"
    puts " - #{eggs} eggs"
    puts "(Press ENTER to continue)"
    gets.chomp
  when "quit"
    puts "See you next time"
  else
    puts "A day passes..."
  end
end
