require 'rspec/expectations'
require 'burger_restaurant_display'

file = File.join(__dir__, "../lib/burger_restaurant.rb")
content = File.read(file)

call_regex = /\s?=\s?burger\W+steak\W+ketchup\W+onions/
got_regex = /\s?=\s?burger\W*(?<parameters>('|").+('|"))\W*(do|{|\n)/



RSpec::Matchers.define :pass_the_right_arguments do |expected|
  match do |actual|
    content.match?(Regexp.new(actual + call_regex.source))
  end
  
  failure_message do |actual|
    got = content.match(Regexp.new(actual + got_regex.source))[:parameters]
    <<~MESSAGE
      expected:   "steak", "ketchup", "onions"
      got:        #{got}

      -
    MESSAGE
  end
end


RSpec::Matchers.define :be_ordered_burger do |expected|
  match do |actual|
    actual == expected
  end
  
  failure_message do |actual|
    <<~MESSAGE
      expected:   #{expected}
      got:        #{actual}

      -
    MESSAGE
  end
end
