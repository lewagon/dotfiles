require "valid_brackets"

describe "`valid_brackets?` with parenthesis only" do
  it "returns true if provided with an empty string" do
    expect(valid_brackets?("")).to eq true
  end

  it "returns false if provided with invalid string" do
    expect(valid_brackets?("()()(()")).to eq false
  end

  it "returns true if provided with valid string" do
    expect(valid_brackets?("(())()")).to eq true
  end

  it "returns true if provided with invalid string with characters" do
    expect(valid_brackets?("((hello))() world")).to eq true
  end
end

describe "`valid_brackets?` with different types of brackets" do
  it "returns false if provided with invalid string" do
    expect(valid_brackets?("()(](){)")).to eq false
  end

  it "returns true if provided with valid string" do
    expect(valid_brackets?("{}[()]")).to eq true
  end

  it "returns true if provided with invalid string with characters" do
    expect(valid_brackets?("{hello}([world]) ({})")).to eq true
  end

  it "returns false if provided with right amount of balenced brackets but in wrong order" do
    expect(valid_brackets?("[(])")).to eq false
  end
end
