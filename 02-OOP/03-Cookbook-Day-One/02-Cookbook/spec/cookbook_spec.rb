require "csv"
require 'recipe_factory'
require_relative 'cookbook_helper'

begin
  require "cookbook"
rescue LoadError
end

class Helper
  def self.write_csv(file, data)
    CSV.open(file, 'w') do |csv|
      data.each do |row|
        csv.puts(row)
      end
    end
  end
end

cookbook_helper = CookbookHelper.new(
  file_name: "cookbook",
  class_name: "Cookbook"
)

describe "Cookbook", unless: cookbook_helper.file_and_class_valid? do
  it '`cookbook.rb` file should exist' do 
    expect(cookbook_helper.file_exists?).to be(true)
  end

  it '`Cookbook` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "Cookbook", if: cookbook_helper.file_and_class_valid? do
  let(:recipes) do
    [
      [ "Crumpets", "Crumpets description" ],
      [ "Beans & Bacon breakfast", "Beans description" ],
      [ "Plum pudding", "Pudding description" ],
      [ "Apple pie", "Apple pie description" ],
      [ "Christmas crumble", "Crumble description" ]
    ]
  end
  let(:csv_path) { "spec/recipes.csv" }

  # On setup reset csv file with recipes
  before do
    Helper.write_csv(csv_path, recipes)
    @cookbook = Cookbook.new(csv_path)
  end

  describe '#initialize' do
    it 'should have loaded existing recipes in spec/recipes.csv' do
      expect(@cookbook.all.length).to eq recipes.length
    end
  end

  describe '#all' do
    it "should give access to all recipes" do
      expect(@cookbook).to respond_to :all
      expect(@cookbook.all).to be_a Array
      first_recipe = @cookbook.all.first
      expect(first_recipe).to be_a(Recipe), lambda { "Cookbook should store Recipe instances, not #{first_recipe.class}" }
    end

    it 'should have Recipe instances' do
      expect(@cookbook.all.first).to be_instance_of(Recipe)
    end
  end

  describe '#add_recipe' do
    it 'should add a recipe to the cookbook' do
      size_before = @cookbook.all.length
      @cookbook.add_recipe(RecipeFactory.build("Risotto", "Good stuff"))
      expect(@cookbook.all.length).to eq (size_before + 1)
    end

    it 'should store the new recipe in CSV' do
      size_before = @cookbook.all.length
      @cookbook.add_recipe(RecipeFactory.build("Risotto","Good stuff"))

      # Reload from CSV
      new_cookbook = Cookbook.new(csv_path)
      expect(new_cookbook.all.length).to eq (size_before + 1)
    end
  end

  describe '#remove_recipe' do
    it 'should remove a recipe from the cookbook' do
      size_before = @cookbook.all.length
      @cookbook.remove_recipe(0)
      expect(@cookbook.all.length).to eq (size_before - 1)
    end

    it 'should remove the recipe from the CSV' do
      size_before = @cookbook.all.length
      @cookbook.remove_recipe(0)

      # Reload from CSV
      new_cookbook = Cookbook.new(csv_path)
      expect(new_cookbook.all.length).to eq (size_before - 1)
    end
  end
end
