require_relative 'orange_tree'
require_relative 'helpers'

orange_tree = OrangeTree.new

until orange_tree.dead?
  orange_tree.one_year_passes!
  print "One year passes"
  sleep(0.1)
  print "."
  sleep(0.05)
  print "."
  sleep(0.05)
  puts "."
  sleep(0.05)
  if orange_tree.dead?
    puts "Your orange tree is dead :("
  else
    puts "Your orange tree is #{pluralize(orange_tree.age, 'year')} old, measures #{pluralize(orange_tree.height, 'meter')}, gives #{pluralize(orange_tree.fruits, 'fruit')}, and is still alive :)"
  end
  sleep(0.1)
  puts ""
end
