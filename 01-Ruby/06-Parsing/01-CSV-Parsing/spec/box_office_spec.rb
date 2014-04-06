# Encoding: utf-8

require "spec_helper"
require "box_office"

describe "#most_successfull" do
  
  let(:movies_list) { most_successfull(3, 1975, File.dirname(__FILE__) + '/../lib/movies.csv') }
  
  it "should return an array of movies" do
    movies_list.must_be_instance_of Array
  end
  
  it "should represent each movie of the list as a hash" do
    movies_list.all? {|movie| movie.is_a? Hash }.must_equal true
  end
  
  it "should represent a movie with keys: name, year, earnings" do
    movies_list.first.keys.all? { |key| [:name, :year, :earnings].include? key }.must_equal true
  end
  
  it "should only keep movies where (year < max year)" do
    movies_list.all?{ |movie| movie[:year] < 1975}.must_equal true
  end
  
  it "should pick movies with maximum earnings" do
    target = [
            {:name=>"L'exorciste", :year=>1973, :earnings=>204565000}, 
            {:name=>"Autant en emporte le vent", :year=>1939, :earnings=>198655278}, 
            {:name=>"Blanche Neige et les sept nains", :year=>1937, :earnings=>184925485}
          ]
    movies_list.must_equal target
  end
end