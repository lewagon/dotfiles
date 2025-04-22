require "demo"

describe "The `circle_area` method" do
  it "should return a number" do
    expect(circle_area(0)).to be_a Numeric
  end

  it "should return 3.14 (PI) if the radius is 1" do
    expect(circle_area(1)).to be_within(0.1).of(3.14)
  end

  it "should return 78.5 if the radius is 5" do
    expect(circle_area(5)).to be_within(0.1).of(78.5)
  end

  it "should return 0 if the radius is negative" do
    expect(circle_area(-1)).to eq(0)
  end
end
