# Encoding: utf-8
require "simple_looping"

describe "#sum_with_while" do

  it "should return the correct sum" do
    sum = sum_with_while(1, 100)
    expect(sum).to eq 5050
  end

end

describe "#sum_with_for" do

  it "should return the correct sum" do
    sum = sum_with_for(1, 100)
    expect(sum).to eq 5050
  end

end

describe "#sum_recursive" do

  it "should return the correct sum" do
    sum = sum_recursive(1, 100)
    expect(sum).to eq 5050
  end

  it "should handle gracefully the case where min > max" do
    expect(lambda { sum_recursive(101, 100) }).to raise_error ArgumentError
  end

end