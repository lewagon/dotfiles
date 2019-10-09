require_relative 'orange_tree'

def pluralize(integer, string)
  if integer == 1
    "#{integer} #{string}"
  else
    "#{integer} #{string}s"
  end
end

orange_tree = OrangeTree.new

100.times do
  orange_tree.one_year_passes!
  print "One year passes"
  sleep(0.2)
  print "."
  sleep(0.1)
  print "."
  sleep(0.1)
  puts "."
  sleep(0.2)
  if orange_tree.dead?
    puts "Your orange tree is dead :("
  else
    puts "Your orange tree is #{pluralize(orange_tree.age, 'year')} old, measures #{pluralize(orange_tree.height, 'meter')}, gives #{pluralize(orange_tree.fruits, 'fruit')}, and is still alive :)"
  end
  break if orange_tree.dead?

  sleep(0.2)
  puts ""
end
