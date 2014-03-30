# Encoding: utf-8

require "spec_helper"
require "box_office"

describe "#most_successfull" do
  
  let(:movies_list) { most_successfull(3, 1990, File.dirname(__FILE__) + '/../lib/movies.csv') }
  
  it "should return an array" do
    movies_list.must_be_instance_of Array
  end
  
  it "should represent each movie of the list as an array" do
    movies_list[0].must_be_instance_of Array
  end
  
  it "should format each movie exactly as [year, name, box_office]" do
    movies_list[0].size.must_equal 3
  end
  
  it "should keep only movies where (year < max year)" do
    movies_list.all?{ |movie| movie[0].to_i < 1990}.must_equal true
  end
  
  it "should sort movies depending on box office results" do
    movies_list.sort_by{ |m| m[0] }.must_equal movies_list
  end
  
  it "should perform the right query" do
    movies_list.must_equal [["1970", "Airport", "100489150"], ["1980", "Faut s'faire la malle", "101500000"], ["1964", "Mary Poppins", "102300000"]] 
  end

end