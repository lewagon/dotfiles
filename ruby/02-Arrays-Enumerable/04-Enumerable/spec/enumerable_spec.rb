# Encoding: utf-8

require "spec_helper"
require "enumerable"

describe "#sum_odd_indexed" do

  it "should compute sum of elements with odd indices'" do
    sum_odd_indexed([4, 7, 6, 8, 10]).must_equal 15
  end
  
end

describe "#even_numbers" do

  it "should return array of even numbers only'" do
    even_numbers([3, 4, 7, 9, 10, 16]).must_equal [4, 10, 16]
  end
  
end

describe "#short_words" do

  it "should get rid of words which size execeed the max_size'" do
    short_words(["you", "are", "my", "playground", "love"], 4).must_equal ["you", "are", "my", "love"]
  end
  
end

describe "#first_under" do

  it "should return first number below the limit" do
    first_under([13, 21, 7, 0, 11, 106], 10).must_equal 7
  end
  
end

describe "#add_bang" do

  it "should append a bang to all elements and return the modified array" do
    add_bang(["yi", "ha"]).must_equal ["yi!", "ha!"]
  end
  
end
 
describe "#product" do

  it "should compute product of given numbers" do
    product([1, 1, 2, 3, 5]).must_equal 30
  end
  
end

describe "#sorted_pairs" do

  it "should group elements by slices of 2 and sort each slice alphabetically" do
    words = %w(say my name say my name)
    sorted_pairs(words).must_equal [["my", "say"],["name", "say"], ["my", "name"]]
  end
  
end
  
  
