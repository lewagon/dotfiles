require_relative 'recipe_helper'

recipe_helper = RecipeHelper.new

describe 'lib folder', unless: recipe_helper.file_exist? do
  it 'should contain a recipe.rb file' do
    expect(recipe_helper.file_exist?).to eq(true)
  end
end


describe 'Recipe', if: recipe_helper.file_exist? do

  recipe_helper.load_file if recipe_helper.file_exist?

  let(:recipe_one) { Recipe.new('Brownie', 'Delicious chocolate cake') }
  let(:recipe_two) { Recipe.new('Lasagna', 'Italian lasagna recipe from grandma') }

  it '`Recipe` class should be defined', unless: recipe_helper.class_defined? do
    expect(recipe_helper.class_defined?).to eq(true)
  end

  describe '#name', if: recipe_helper.file_and_class_valid? do
    it 'should return the name of recipe' do
      expect(recipe_one).to respond_to :name
    end
  end

  describe '#description', if: recipe_helper.file_and_class_valid? do
    it 'should return the description of recipe' do
      expect(recipe_one).to respond_to :description
    end
  end

  describe '#initialize', if: recipe_helper.file_and_class_valid? do
    it 'should create a recipe with a list of attributes' do
      expect(recipe_one.name).to eq 'Brownie'
      expect(recipe_one.description).to eq 'Delicious chocolate cake'
      expect(recipe_two.name).to eq 'Lasagna'
      expect(recipe_two.description).to eq 'Italian lasagna recipe from grandma'
    end
  end
end
