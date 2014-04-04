# Encoding: utf-8
require "spec_helper"
require "anagrams"

describe "#anagrams?" do

  it "should return true if words are anagrams" do
    anagrams?("Monica Lewinsky!", "Nice silky woman").must_equal true
  end

  it "should return false if words are not anagrams" do
    anagrams?("bill", "bob").must_equal false
  end
end

describe "#anagrams_on_steroids?" do

  it "should return true if words are anagrams" do
    anagrams_on_steroids?("Monica Lewinsky!", "Nice silky woman").must_equal true
  end
  
  it "should return false if words are not anagrams" do
    anagrams_on_steroids?("bill", "bob").must_equal false
  end

end