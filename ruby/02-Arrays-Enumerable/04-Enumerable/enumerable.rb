def sum_odd_indexed(array)
  # TODO: computes the sum of elements at odd indices (1, 3, 5, 7, etc.) 
  #       You should make use Enumerable#each_with_index
end
 
def even_numbers(array)
  # TODO: Return the even numbers from a list of integers.
  #       You should use Enumerable#select
end

def short_words(array, max_length)
  # TODO: Take and array of words, return the array of words not exceeding max_length characters
  #       You should use Enumerable#reject
end
 
def first_under(array, limit)
  # TODO: Return the first number from an array that is less than limit.
  #       You should use Enumerable#find
end
 
def add_bang(array)
  # TODO: Take an array of strings and return a new array with "!" appended to each string.
  #       You should use Enumerable#map
end
 
def product(array)
  # TODO: Calculate the product of an array of numbers.
  #       You should use of Enumerable#reduce
end
 
def sorted_triples(array)
  # TODO: Reorganize an Array of the elements into groups of 3, and then sort each group alphabetically.
  #       You should make use of Enumerable#each_slice
end


# Manually Testing your code
puts sum_odd_indexed([4, 7, 6, 8, 10]) == 15
 
puts even_numbers([3, 4, 7, 9, 10, 16]) == [4, 10, 16]
 
puts short_words(["you", "are", "my", "playground", "love"], 4) == ["you", "are", "my", "love"]

puts first_under([13, 21, 7, 0, 11, 106], 10) == 7
 
puts add_bang(["yi", "ha"]) == ["yi!", "ha!"]
 
puts product([1, 1, 2, 3, 5]) == 30
 
words = %w(say my name say my name)
puts sorted_triples(words) == [["my", "name", "say"],
                               ["my", "name", "say"]]