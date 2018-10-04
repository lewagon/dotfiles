require_relative 'recipe_helper'

recipe_helper = RecipeHelper.new

describe 'lib folder', unless: recipe_helper.file_exists? do
  it 'should contain a recipe.rb file' do
    expect(recipe_helper.file_exists?).to eq(true)
  end
end


describe 'Recipe', if: recipe_helper.file_exists? do

  recipe_helper.load_file if recipe_helper.file_exists?

  let(:recipe) { Recipe.new('Brownie', 'Delicious chocolate cake') }

  it '`Recipe` class should be defined', unless: recipe_helper.class_defined? do
    expect(recipe_helper.class_defined?).to eq(true)
  end

  describe '#name', if: recipe_helper.file_and_class_valid? do
    it 'should return the name of recipe' do
      expect(recipe).to respond_to :name
    end
  end

  describe '#description', if: recipe_helper.file_and_class_valid? do
    it 'should return the description of recipe' do
      expect(recipe).to respond_to :description
    end
  end

  describe '#initialize', if: recipe_helper.file_and_class_valid? do
    it 'should create a recipe with a list of attributes' do
      expect(recipe.name).to eq 'Brownie'
      expect(recipe.description).to eq 'Delicious chocolate cake'
    end
  end
end
