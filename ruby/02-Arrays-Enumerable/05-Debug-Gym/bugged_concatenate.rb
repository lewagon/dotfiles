def bugged_concatenate(array)
  array.inject("") { |output, element| output + element }.upcase
end

bugged_concatenate( 1, "9", 84, " ", "George Orwell" )