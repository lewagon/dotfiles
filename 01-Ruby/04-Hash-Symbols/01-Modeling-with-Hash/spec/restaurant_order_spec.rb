require "restaurant_order"

describe "#poor_calories_counter" do
  it "should compute number of calories" do
    expect(poor_calories_counter("Cheese Burger", "Salad", "Lemonade")).to eq(405)
  end

  it "should compute number of calories" do
    expect(poor_calories_counter("Veggie Burger", "Sweet Potatoes", "Iced Tea")).to eq(840)
  end
end
