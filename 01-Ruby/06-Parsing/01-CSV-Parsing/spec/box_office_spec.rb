# Encoding: utf-8
require "box_office"

describe "#most_successfull" do

  let(:movies_list) { most_successfull(3, 1975, File.dirname(__FILE__) + '/../lib/movies.csv') }

  it "should return an array of movies" do
    expect(movies_list).to be_a Array
  end

  it "should represent each movie of the list as a hash" do
    expect(movies_list.all? {|movie| movie.is_a? Hash }).to eq true
  end

  it "should represent a movie with keys: name, year, earnings" do
    expect(movies_list.first.keys.all? { |key| [:name, :year, :earnings].include? key }).to eq true
  end

  it "should only keep movies where (year < max year)" do
    expect(movies_list.all?{ |movie| movie[:year] < 1975}).to eq true
  end

  it "should pick movies with maximum earnings" do
    target = [
            {:name=>"L'exorciste", :year=>1973, :earnings=>204565000},
            {:name=>"Autant en emporte le vent", :year=>1939, :earnings=>198655278},
            {:name=>"Blanche Neige et les sept nains", :year=>1937, :earnings=>184925485}
          ]
    expect(movies_list).to eq target
  end
end