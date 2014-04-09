require_relative "playboy"

#TODO: Set nationality getter or setter 
casanova = Playboy.new("Giacomo Casanova", "Italian")
puts casanova.nationality

#TODO: Set conquests getter or setter 
casanova.meets("Giullia")
casanova.meets("Louisia")
casanova.conquests.each_with_index {|conquest, index| puts "conquest #{index + 1} : #{conquest}"}

#TODO: Set status getter or setter 
casanova.marry("Giorgia") # Casanova gets married.. 
casanova.status = "married"

#TODO: Set status getter or setter 
puts casanova.status