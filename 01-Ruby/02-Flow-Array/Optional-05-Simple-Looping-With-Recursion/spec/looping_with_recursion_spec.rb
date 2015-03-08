require "looping_with_recursion"

describe "#sum_recursive" do

  it "should return the correct sum" do
    sum = sum_recursive(1, 100)
    expect(sum).to eq 5050
  end

  it "should handle gracefully the case where min > max by returning -1" do
    sum = sum_recursive(101, 100)
    expect(sum).to eq -1
  end

end
