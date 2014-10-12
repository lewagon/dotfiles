# Encoding: utf-8
require "anagrams"

describe "#anagrams?" do

  it "should return true if words are anagrams" do
    expect(anagrams?("Monica Lewinsky!", "Nice silky woman")).to eq true
  end

  it "should return false if words are not anagrams" do
    expect(anagrams?("bill", "bob")).to eq false
  end
end

describe "#anagrams_on_steroids?" do

  it "should return true if words are anagrams" do
    expect(anagrams_on_steroids?("Monica Lewinsky!", "Nice silky woman")).to eq true
  end

  it "should return false if words are not anagrams" do
    expect(anagrams_on_steroids?("bill", "bob")).to eq false
  end

end