# Check your 06

# Writes a program that checks if a phone number is a valid french number.
# A french phone number should contain 10 numbers and starting with 0 or 12 numbers starting with +33
# Also you can accept phone number with delimiters between numbers.

# Objective
# How to use regex


# Help
# http://rubular.com/


def is_valid_phone_number(phone_number)
  # your code here
end



# tests

puts is_valid_phone_number("0665363636") # should output true
puts is_valid_phone_number("06 65 36 36 36") # should output true
puts is_valid_phone_number("06-65-36-36-36") # should output true
puts is_valid_phone_number("+33 6 65 36 36 36") # should output true

puts is_valid_phone_number("06 65 36 36") # should output false
puts is_valid_phone_number("2336653636") # should output false