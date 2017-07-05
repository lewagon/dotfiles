require "mc_donald"

describe "#poor_calories_counter" do

  it "should compute number of calories" do
    expect(poor_calories_counter("Big Mac", "French Fries", "Coca Cola")).to eq(920)
  end

end

describe "#calories_counter" do

  it "should compute number of calories" do
    expect(calories_counter(["Big Mac", "French Fries", "Happy Meal", "Coca Cola"])).to eq(1600)
  end

end
