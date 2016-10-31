begin
  require_relative "../app/models/meal.rb"
rescue LoadError => e
  if e.message =~ /meal\.rb/
    describe "Meal" do
      it "You need a `meal.rb` file for your `Meal` model" do
        fail
      end
    end
  else
    raise e
  end
end

describe "Meal", :meal do
  it "should be initialized with a hash of properties" do
    properties = { id: 1, name: "Margherita", price: 8 }
    meal = Meal.new(properties)
    expect(meal).to be_a(Meal)
  end

  describe "#id" do
    it "should return the meal id" do
      meal = Meal.new({ id: 42 })
      expect(meal.id).to eq(42)
    end
  end

  describe "#id=" do
    it "should set the meal id" do
      meal = Meal.new({ id: 42 })
      meal.id = 43
      expect(meal.id).to eq(43)
    end
  end

  describe "#name" do
    it "should return the name of the Meal" do
      meal = Meal.new({ name: "Margherita" })
      expect(meal.name).to eq("Margherita")
    end
  end

  describe "#price" do
    it "should return the price of the Meal" do
      meal = Meal.new({ price: 8 })
      expect(meal.price).to eq(8)
    end
  end
end
