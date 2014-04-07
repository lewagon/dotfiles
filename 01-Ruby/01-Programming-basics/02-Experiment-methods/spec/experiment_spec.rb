# Encoding: utf-8

require "spec_helper"
require "experiment"

describe "#get_rid_of_surrounding_whitespaces" do

  it "should get rid of both leading and trailing whitespaces" do
    response = get_rid_of_surrounding_whitespaces "  hey yo  "
    response.must_equal "hey yo"
  end

end


describe "#belongs_to?" do

  it "should return true if the word is included in the string" do
    response = belongs_to?("hey jude", "jude")
    response.must_equal true
  end

  it "should return false if the word is not in the string" do
    response = belongs_to?("hey jude", "joe")
    response.must_equal false
  end


end

describe "#replace" do

  it "should correctly replace the letter in the string" do
    response = replace("casanova", "a", "o")
    response.must_equal "cosonovo"
  end

end

describe "#exactly_divide" do

  it "should compute the floating division" do
    response = exactly_divide(13, 4)
    response.must_equal 3.25
  end

end

describe "#is_divisible_by_two" do

  it "should return true if number is even" do
    response = is_divisible_by_two(6)
    response.must_equal true
  end

  it "should return false if number is odd" do
    response = is_divisible_by_two(7)
    response.must_equal false
  end


end

describe "#random_subset" do

  array = ('a'..'z').to_a
  response = random_subset(('a'..'z').to_a, 4)

  it "should return array of correct size" do
    response.must_be_instance_of Array
    response.size.must_equal 4 if response.is_a? Array
  end

  it "should return random elements" do
    other_response = random_subset(('a'..'z').to_a, 4)
    response.wont_equal other_response
  end

  it "should return elements present in the initial array" do
    (response - array).must_be_empty
  end

end

describe "#randomize" do

  array = ('a'..'z').to_a
  response = randomize(array)

  it "should return random elements" do
    other_response = randomize(array)
    response.wont_equal other_response
  end

  it "should return random copy of the initial array" do
    response.must_be_instance_of Array
    response.sort.must_equal array.sort
  end

end

describe "#ascending_order" do

  it "should return the sorted array" do
    array = ('a'..'z').to_a.shuffle
    response = ascending_order(array)
    response.must_equal array.sort
  end

end

