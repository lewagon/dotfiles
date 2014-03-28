# Encoding: utf-8

require "spec_helper"
require "array_to_hash"

describe "#array_to_hash" do
  array = ["a", "b", "c"]
  
  it "should build hash with index keys when called without block" do
    array_to_hash(array).must_equal({ 0 => "a", 1 => "b", 2 => "c" }) 
  end
  
  it "should build hash keys executing block on array indices" do
    array_to_hash(array) { |index| "key#{index + 1}" }.must_equal({ "key1" => "a", "key2" => "b", "key3" => "c" })
  end

end