require "mc_donald"

describe "#calories_counter" do
  it "should compute number of calories" do
    expect(calories_counter(["Big Mac", "French Fries", "Happy Meal", "Coca Cola"])).to eq(1600)
  end

  it "should compute number of calories" do
    expect(calories_counter(["Best Of Big Mac", "Salad", "Happy Meal", "Sprite"])).to eq(1765)
  end
end
