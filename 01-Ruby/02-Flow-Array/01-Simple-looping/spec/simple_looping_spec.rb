require "simple_looping"

describe "#sum_with_while" do

  it "should return the correct sum" do
    sum = sum_with_while(1, 100)
    expect(sum).to eq 5050
  end

  it "should handle gracefully the case where min > max by returning -1" do
    sum = sum_with_while(101, 100)
    expect(sum).to eq -1
  end
end

describe "#sum_with_for" do

  it "should return the correct sum" do
    sum = sum_with_for(1, 100)
    expect(sum).to eq 5050
  end

  it "should handle gracefully the case where min > max by returning -1" do
    sum = sum_with_for(101, 100)
    expect(sum).to eq -1
  end
end
