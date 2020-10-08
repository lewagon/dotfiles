require "simple_looping"

describe "#sum_with_for" do

  it "should return the correct sum" do
    sum = sum_with_for(1, 100)
    expect(sum).to eq 5050
  end

  it "should return -1 if min number > max number" do
    sum = sum_with_for(101, 100)
    expect(sum).to eq -1
  end
end

describe "#sum_with_while" do

  it "should return the correct sum (1 -> 100)" do
    sum = sum_with_while(1, 100)
    expect(sum).to eq 5050
  end

  it "should return the correct sum (7 -> 42)" do
    sum = sum_with_while(7, 42)
    expect(sum).to eq 882
  end

  it "should return -1 if min number > max number" do
    sum = sum_with_while(101, 100)
    expect(sum).to eq -1
  end
end
