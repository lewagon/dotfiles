require "beer_song"
require 'open3'

describe "#beer_song" do
  def run_beer_song(beer_count)
    result = ""
    Open3.popen2("ruby ./lib/beer_song.rb #{beer_count}") do |i, o, th|
      i.close

      result = o.read
    end
    result
  end

  it "should sing the beer song for one bear!" do
    result = run_beer_song(1)
    expect(result).to eq "1 bottle of beer on the wall, 1 bottle of beer!
Take one down, pass it around, no more bottles of beer on the wall!"
  end
end
