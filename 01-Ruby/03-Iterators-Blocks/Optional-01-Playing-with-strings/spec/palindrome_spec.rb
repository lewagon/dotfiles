require "palindrome"

describe "#palindrome?" do
  it "should return false for an empty string" do
    expect(palindrome?("")).to eq false
  end

  it "should return false for a non-palindromic word" do
    expect(palindrome?("wagon")).to eq false
  end

  it "should return true for a simple palindromic word" do
    expect(palindrome?("laval")).to eq true
  end

  it "should return true for a simple palindromic word, ignoring case" do
    expect(palindrome?("Laval")).to eq true
  end

  it "should work for a complex sentence with punctuation" do
    expect(palindrome?("Madam, I'm Adam!")).to eq true
  end

  it "should work for an even more complex sentence" do
    expect(palindrome?("A man, a plan, a canal -- Panama")).to eq true
  end
end
