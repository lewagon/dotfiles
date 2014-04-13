# Encoding: utf-8

require "spec_helper"
require "challenge"

describe "#method" do

  it "should do smthing'" do
  end

end

# Testing your code 
jelly = JellyBean.new("jelly bean", 130, "black licorice")
puts jelly.healthy? == true # => true : it inherits healthy? method from the Dessert class
puts jelly.delicious? == false # => true : delicious is over-ridden by the children class implementation !