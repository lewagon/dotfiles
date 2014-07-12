require "spec_helper"
require "cookbook"
require "csv"

class Helper
  def self.read_csv(file)
    CSV.read(file).flatten
  end

  def self.write_csv(file, data)
    CSV.open(file, 'w') do |csv|
      data.each do |d|
        csv.puts([d])
      end
    end
  end
end

describe Cookbook do
  let(:recipes) { ["Crumpets", "Beans & Bacon breakfast", "Plum pudding", "Apple pie", "Christmas crumble"] }
  let(:csv_path) { "spec/recipes.csv" }

  # On setup reset csv file with recipes
  before do
    Helper.write_csv(csv_path, recipes)
    @cookbook = Cookbook.new(csv_path)
  end

  describe 'when initialized' do
    it 'stores the file path in an instance variable' do
      @cookbook.instance_variable_get(:@file).must_equal csv_path
    end

    it 'stores the recipes in an instance variable containing an Array' do
      @cookbook.instance_variable_get(:@recipes).length.must_equal recipes.length
    end
  end # when initialized

  describe 'can save the data' do
    it 'has a save method' do
      @cookbook.must_respond_to :save
    end
  end

  describe 'to access the data' do
    describe '#all' do
      it 'returns the recipes' do
        @cookbook.all.must_equal recipes
      end
    end # all
  end # to access the data

  describe 'to modify the data' do
    describe '#create' do
      it 'adds the recipe to the recipes array' do
        @cookbook.create("Cake")
        @cookbook.all.must_equal recipes + ["Cake"]
      end

      it 'adds the recipe to the CSV file' do
        @cookbook.create("Cake")
        Helper.read_csv(csv_path).must_equal recipes + ["Cake"]
      end

    end # create

    describe '#destroy' do
      it 'removes the recipe from the recipes array' do
        @cookbook.destroy(4)
        @cookbook.all.last.must_equal recipes[3]
      end

      it 'removes the recipe from the CSV file' do
        @cookbook.destroy(4)
        Helper.read_csv(csv_path).last.must_equal recipes[3]
      end
    end

  end # to modify the data

end
