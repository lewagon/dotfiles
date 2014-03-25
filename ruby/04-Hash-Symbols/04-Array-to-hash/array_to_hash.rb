def array_to_hash(array)
  #TODO: implement the method :)
end


# Testing your code

array = ["a", "b", "c"]
p array_to_hash(array) # => { 0 => "a", 1 => "b", 2 => "c" } 
p array_to_hash(array) { |index| "key#{index + 1}" } # => { "key1" => "a", "key2" => "b", "key3" => "c" }
