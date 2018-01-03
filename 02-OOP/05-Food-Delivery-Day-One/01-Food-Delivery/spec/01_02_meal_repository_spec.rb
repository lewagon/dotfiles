require "fileutils"
require_relative "support/csv_helper"

begin
  require_relative "../app/repositories/meal_repository"
rescue LoadError => e
  if e.message =~ /meal_repository/
    describe "MealRepository" do
      it "You need a `meal_repository.rb` file for your `MealRepository`" do
        fail
      end
    end
  else
    raise e
  end
end

describe "MealRepository", :meal do
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

  before(:each) do
    CsvHelper.write_csv(csv_path, meals)
  end

  def elements(repo)
    repo.instance_variable_get(:@meals) ||
      repo.instance_variable_get(:@elements)
  end

  describe "#initialize" do
    it "should take one argument: the CSV file path to store meals" do
      expect(MealRepository.instance_method(:initialize).arity).to eq(1)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { MealRepository.new('unexisting_file.csv') }.not_to raise_error
    end

    it "store meals in memory in an instance variable `@meals` or `@elements`" do
      repo = MealRepository.new(csv_path)
      expect(elements(repo)).to be_a(Array)
    end

    it "loads existing meals from the CSV" do
      repo = MealRepository.new(csv_path)
      loaded_meals = elements(repo) || []
      expect(loaded_meals.length).to eq(5)
    end

    it "fills the `@meals` with instance of `Meal`, setting the correct types on each property" do
      repo = MealRepository.new(csv_path)
      loaded_meals = elements(repo) || []
      fail if loaded_meals.empty?
      loaded_meals.each do |meal|
        expect(meal).to be_a(Meal)
        expect(meal.id).to be_a(Integer)
        expect(meal.price).to be_a(Integer)
      end
    end
  end

  describe "#all" do
    it "should return all the meals stored by the repo" do
      repo = MealRepository.new(csv_path)
      expect(repo.all).to be_a(Array)
      expect(repo.all[0].name).to eq("Margherita")
    end

    it "MealRepository should not expose the @meals through a reader/method" do
      repo = MealRepository.new(csv_path)
      expect(repo).not_to respond_to(:meals)
    end
  end

  describe "#add" do
    it "should add a meal to the in-memory list" do
      repo = MealRepository.new(csv_path)
      new_meal = Meal.new(price: 12, name: 'Hawaii')
      repo.add(new_meal)
      expect(repo.all.length).to eq(6)
    end

    it "should set the new meal id" do
      repo = MealRepository.new(csv_path)
      hawaii_meal = Meal.new(price: 11, name: 'Hawaii')
      repo.add(hawaii_meal)
      expect(hawaii_meal.id).to eq(6)
      rucola_meal = Meal.new(price: 12, name: 'Rucola')
      repo.add(rucola_meal)
      expect(rucola_meal.id).to eq(7)
    end

    it "should start auto-incrementing at 1 if it is the first meal added" do
      csv_path = 'unexisting_empty_meals.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = MealRepository.new(csv_path)
      hawaii_meal = Meal.new(price: 11, name: 'Hawaii')
      repo.add(hawaii_meal)
      expect(hawaii_meal.id).to eq(1)

      FileUtils.remove_file(csv_path, force: true)
    end

    it "every new added meal should be saved in a row in the CSV (first row = headers)" do
      csv_path = 'spec/support/empty_meals.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = MealRepository.new(csv_path)
      hawaii_meal = Meal.new(price: 11, name: 'Hawaii')
      repo.add(hawaii_meal)

      repo = MealRepository.new(csv_path)
      expect(repo.all.length).to eq(1)
      expect(repo.all[0].id).to eq(1)
      expect(repo.all[0].name).to eq("Hawaii")
      expect(repo.all[0].price).to eq(11)

      rucola_meal = Meal.new(price: 12, name: 'Rucola')
      repo.add(rucola_meal)
      expect(rucola_meal.id).to eq(2)

      repo = MealRepository.new(csv_path)
      expect(repo.all.length).to eq(2)
      expect(repo.all[1].id).to eq(2)
      expect(repo.all[1].name).to eq("Rucola")
      expect(repo.all[1].price).to eq(12)

      FileUtils.remove_file(csv_path, force: true)
    end
  end

  describe "#find" do
    it "should retrieve a specific meal based on its id" do
      repo = MealRepository.new(csv_path)
      meal = repo.find(3)
      expect(meal.id).to eq(3)
      expect(meal.name).to eq("Napolitana")
    end
  end
end
