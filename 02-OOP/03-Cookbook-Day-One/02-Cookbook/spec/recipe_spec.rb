require_relative 'cookbook_helper'

begin
  require 'recipe_factory'
rescue
end

cookbook_helper = CookbookHelper.new(
  file_name: "recipe",
  class_name: "Recipe"
)

describe "Recipe", unless: cookbook_helper.file_and_class_valid? do
  it '`recipe.rb` file should exist' do
    expect(cookbook_helper.file_exist?).to be(true)
  end

  it '`recipe.rb` can require and require_relative files without errors' do
    require "recipe"
  rescue LoadError => e
    raise cookbook_helper.require_error(e)
  end

  it '`Recipe` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "Recipe", if: cookbook_helper.file_and_class_valid? do
  let(:recipe) { RecipeFactory.build("", "") }

  describe '#name' do
    it 'should return the name of recipe' do
      expect(recipe).to respond_to :name
    end
  end

  describe '#description' do
    it 'should return the description of recipe' do
      expect(recipe).to respond_to :description
    end
  end

  describe '#initialize' do
    it 'should create a recipe with a list of attributes' do
      recipe = RecipeFactory.build('Brownie', 'Delicious chocolate cake')
      expect(recipe.name).to eq 'Brownie'
      expect(recipe.description).to eq 'Delicious chocolate cake'
    end
  end
end
