require_relative "playboy"

casanova = Playboy.new("Giacomo Casanova", "Italian")
puts casanova.nationality

casanova.meets("Giullia")
casanova.meets("Louisia")
casanova.conquests.each_with_index {|conquest, index| puts "conquest #{index + 1} : #{conquest}"}

10.times { casanova.hair_length += 1 }
casanova.hair_length =  0 # Casanova gets shaved
