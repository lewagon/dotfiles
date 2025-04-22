require "roman_to_integer"

describe "#roman_to_integer" do

  it "should work for several values" do
    expect(roman_to_integer('IV')).to eq(4)
    expect(roman_to_integer('XII')).to eq(12)
    expect(roman_to_integer('XIX')).to eq(19)
    expect(roman_to_integer('XLIX')).to eq(49)
    expect(roman_to_integer('LXXVIII')).to eq(78)
    expect(roman_to_integer('LXXIX')).to eq(79)
    expect(roman_to_integer('CI')).to eq(101)
    expect(roman_to_integer('MCMLXXXIX')).to eq(1989)
  end

  it "should work for an empty string" do
    expect(roman_to_integer('')).to eq(0)
  end

  it "should work for invalid letters" do
    expect(roman_to_integer('A')).to eq(0)
    expect(roman_to_integer('Z')).to eq(0)
  end
end
