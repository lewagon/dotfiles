require "spec_helper"

begin
  require 'recipe_factory'
rescue
end

describe Recipe do
  let(:recipe) { RecipeFactory.build("", "") }

  describe '#name' do
    it 'should return the name of recipe' do
      recipe.must_respond_to :name
    end
  end

  describe '#description' do
    it 'should return the description of recipe' do
      recipe.must_respond_to :description
    end
  end

  describe '#initialize' do
    it 'should create a recipe with a list of attributes' do
      recipe = RecipeFactory.build('Brownie', 'Delicious chocolate cake')
      recipe.name.must_equal 'Brownie'
      recipe.description.must_equal 'Delicious chocolate cake'
    end
  end
end
