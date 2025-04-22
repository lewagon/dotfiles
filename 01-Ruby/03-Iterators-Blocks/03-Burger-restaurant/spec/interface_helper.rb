require 'rspec/expectations'
require_relative 'helper/burger_restaurant_display'

file = File.join(__dir__, "../lib/interface.rb")
content = File.read(file)

METHOD_CALL_PATTERN = /\s*=\s*burger\W*(?<parameters>('|").+('|"))\W*(do|{|\n)/


RSpec::Matchers.define :pass_the_right_arguments do |*expected|
  match do |actual|
    r  = Regexp.new(actual + /\s*=\s*burger\W*/.source + /#{expected.join('\\W*')}/.source)
    content.match?(r)
  end

  failure_message do |actual|
    r = Regexp.new(actual + METHOD_CALL_PATTERN.source)
    got = content.match(r) ? content.match(r)[:parameters] : ""
    <<~MESSAGE
      expected:   "#{expected.join('", "')}"
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
