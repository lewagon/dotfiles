# NOTE: Read about BasicObject#object_id
# http://www.ruby-doc.org/core-2.1.1/BasicObject.html#method-i-__id__

# You can try launching `irb` to test some values
# irb> :foo.object_id
# irb> :foo.object_id
# irb> "foo".object_id
# irb> "foo".object_id

def are_identitical_symbols_same_objects?
  # TODO: true or false?
end

def are_identitical_strings_same_objects?
  # TODO: true or false?
end


# Remember, RTFM! Your doc is your friend
# - http://www.ruby-doc.org/core-2.1.1/String.html
# - http://www.ruby-doc.org/core-2.1.1/Symbol.html

def convert_string_to_symbol(a_string)
  # TODO: return the symbol version of "a_string"
end

def convert_symbol_to_string(a_symbol)
  # TODO: return the string version of "a_symbol"
end

def me
  # TODO: return a Hash representing yourself, with keys such as age and name
end

def fruits
  # TODO: return an array of fruits
end