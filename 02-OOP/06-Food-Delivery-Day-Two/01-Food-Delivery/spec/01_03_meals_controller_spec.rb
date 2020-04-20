require_relative "support/csv_helper"

begin
  require_relative "../app/controllers/meals_controller"
  require_relative "../app/repositories/meal_repository"
rescue LoadError => e
  if e.message =~ /meal_repository/ || e.message =~ /meals_controller/
    describe "MealsController" do
      it "You need a `meals_controller.rb` file for your `MealsController`" do
        fail
      end
    end
  else
    raise e
  end
end

describe "MealsController", :meal do
  let(:meals) do
    [
      [ "id", "name", "price" ],
      [ 1, "Margherita", 8 ],
      [ 2, "Capricciosa", 11 ],
      [ 3, "Napolitana", 9 ],
      [ 4, "Funghi", 12 ],
      [ 5, "Calzone", 10 ]
    ]
  end
  let(:csv_path) { "spec/support/meals.csv" }
  let(:repository) { MealRepository.new(csv_path) }

  before(:each) do
    CsvHelper.write_csv(csv_path, meals)
  end

  it "should be initialized with a `MealRepository` instance" do
    controller = MealsController.new(repository)
    expect(controller).to be_a(MealsController)
  end

  describe "#add" do
    it "should ask the user for a name and price, then store the new meal" do
      controller = MealsController.new(repository)

      allow_any_instance_of(Object).to receive(:gets).and_return("12")
      controller.add

      expect(repository.all.length).to eq(6)
      expect(repository.all[5].name).to eq("12")
      expect(repository.all[5].price).to eq(12)
    end
  end

  describe "#list" do
    it "should grab meals from the repo and display them" do
      controller = MealsController.new(repository)
      meals.drop(1).each do |meal_array|
        expect(STDOUT).to receive(:puts).with(/#{meal_array[1]}/)
      end

      controller.list
    end
  end
end
