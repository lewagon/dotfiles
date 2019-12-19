require "ruby_is"

describe "find_nth_word" do
  it "should return a regular expression extracting the nth word of a sentence" do
    expect(find_nth_word(3, "I love Regex")).to eq "Regex"
  end
end


describe "#ruby_is" do
  it "should return the description of Ruby" do
    expect(ruby_is).downcase.to eq "a dynamic open source programming language with a focus on simplicity and productivity it has an elegant syntax that is natural to read and easy to write"
  end
end