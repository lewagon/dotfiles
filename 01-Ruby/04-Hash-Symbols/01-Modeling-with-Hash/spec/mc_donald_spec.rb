require "mc_donald"

describe "#poor_calories_counter" do
  it "should compute number of calories" do
    expect(poor_calories_counter("Big Mac", "Salad", "Coca Cola")).to eq(705)
  end

  it "should compute number of calories" do
    expect(poor_calories_counter("McChicken", "French Fries", "Sprite")).to eq(730)
  end
end
