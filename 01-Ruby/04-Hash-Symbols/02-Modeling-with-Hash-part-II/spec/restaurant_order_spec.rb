require "restaurant_order"

describe "#calories_counter" do
  it "should compute number of calories" do
    expect(calories_counter(["Cheese Burger", "Sweet Potatoes", "Cheesy Combo", "Iced Tea"])).to eq(1220)                      
  end

  it "should compute number of calories" do
    expect(calories_counter(["Veggie Combo", "Salad", "Vegan Combo", "Lemonade"])).to eq(1400)
  end
end
