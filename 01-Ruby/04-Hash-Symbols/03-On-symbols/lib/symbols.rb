# NOTE: Read about BasicObject#object_id
# https://ruby-doc.org/core-3.1.2/BasicObject.html#method-i-__id__

# You can try launching `irb` to test some values
# irb> :foo.object_id
# irb> :foo.object_id
# irb> "foo".object_id
# irb> "foo".object_id

def are_identical_symbols_same_objects?
  # Are two symbols with the same value the same object? (In other words, is :foo the same object as :foo?)
  # TODO: Answer the question by returning true or false in this method
  # NOTE: You should just return true or false. You don't need to do any comparison
  # or check if the symbols are the same. Just return true if they are the same object
  # and false if they are not. It's a quiz question.
end

def are_identical_strings_same_objects?
  # Are two strings with the same value the same object? (In other words, is "foo" the same object as "foo"?)
  # TODO: Answer the question by returning true or false in this method
  # NOTE: You should also just return true or false. You don't need to do any comparison or logic.
  # Just return true if they are the same object and false if they are not. It's a quiz question.
end


# Remember, RTFM! Your doc is your friend
# - https://ruby-doc.org/core-3.1.2/String.html
# - https://ruby-doc.org/core-3.1.2/Symbol.html

def convert_string_to_symbol(a_string)
  # TODO: return the symbol version of the parameter `a_string` passed to this method
end

def convert_symbol_to_string(a_symbol)
  # TODO: return the string version of the parameter `a_symbol` passed to this method
end

def me
  # TODO: return a Hash representing yourself, with keys such as age and name
end

def fruits
  # TODO: return an array of fruits
end
