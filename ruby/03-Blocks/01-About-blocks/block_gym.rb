def tag(tag_name, attr = nil)
  #TODO:  Build HTML tags around  content given in the block
  #       The method can be called with an optional HTML attribute inputted as [attr_name, attr_value]
end

def timer_for
  #TODO:  Return time taken to execute the given block
end

def transform(element)
  #TODO:  Simply execute the given block on element
end

# Testing your code
html_string = tag("div", ["class", "kitt-link"]) do 
  tag("h2") do 
    tag("a", ["href", "http://kitt.lewagon.org"]) do 
      "KITT"
    end
  end
end

time = timer_for do 
  (1..100).each { |i| (1..100000).to_a.shuffle.sort }
end

double = transform(5) do |el|
  el * 2
end

triple = transform(5) do |el|
  el * 3
end

triple_word = transform("word ") do |el|
  el * 3
end

p html_string # => "<div class='kitt-link'><h2><a href='http://kitt.lewagon.org'>KITT</a></h2></div>"
p time # => around 2-3 seconds
p double # => 10
p triple # => 15
p triple_word # => 15




