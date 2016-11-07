require_relative "support/csv_helper.rb"

begin
  require_relative "../app/controllers/meals_controller.rb"
  require_relative "../app/repositories/meals_repository.rb"
rescue LoadError => e
  if e.message =~ /meals_repository\.rb/ || e.message =~ /meals_controller\.rb/
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
  let(:repository) { MealsRepository.new(csv_path) }

  it "should be initialized with a `MealsRepository` instance" do
    controller = MealsController.new(repository)
    expect(controller).to be_a(MealsController)
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

  describe "#add" do
    it "should ask the user for a name and price, then store the new meal" do
      controller = MealsController.new(repository)
      module Kernel; def gets; STDIN.gets; end; end
      allow(STDIN).to receive(:gets).and_return("Hawaii", "11")

      controller.add

      expect(repository.all.length).to eq(6)
      expect(repository.all[5].name).to eq("Hawaii")
      expect(repository.all[5].price).to eq(11)
    end
  end
end
