require "enumerable"

describe "#sum_odd_indexed" do

  it "should compute the sum of odd-indexed elements'" do
    expect(sum_odd_indexed([4, 7, 6, 8, 10])).to eq 15
  end

end

describe "#even_numbers" do

  it "should return an array of even numbers only'" do
    expect(even_numbers([3, 4, 7, 9, 10, 16])).to eq [4, 10, 16]
  end

end

describe "#short_words" do

  it "should get rid of words that size exceed the max_size'" do
    expect(short_words(["you", "are", "my", "playground", "love"], 4)).to eq ["you", "are", "my", "love"]
  end

end

describe "#first_under" do

  it "should return the first number below the limit" do
    expect(first_under([13, 21, 7, 0, 11, 106], 10)).to eq 7
  end

end

describe "#add_bang" do

  it "should append an exclamation mark to all elements and return the modified array" do
    expect(add_bang(["yi", "ha"])).to eq ["yi!", "ha!"]
  end

end

describe "#concatenate" do

  it "should concatenate all the given strings" do
    expect(concatenate(["hello", " ", "all", ",", " ", "how", " ", "are", " ", "you", "?"])).to eq "hello all, how are you?"
  end

end

describe "#sorted_pairs" do

  it "should group elements into twos and sort each slice alphabetically" do
    words = %w(say my name say my name)
    expect(sorted_pairs(words)).to eq [["my", "say"],["name", "say"], ["my", "name"]]
  end

end


