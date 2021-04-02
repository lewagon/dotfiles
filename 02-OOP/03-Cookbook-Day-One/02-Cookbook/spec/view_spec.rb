require_relative 'cookbook_helper'

begin
  require 'recipe_factory'
  require 'view'
rescue LoadError
end


cookbook_helper = CookbookHelper.new(
  file_name: "view",
  class_name: "View"
)

describe "View", unless: cookbook_helper.file_and_class_valid? do
  it '`view.rb` file should exist' do 
    expect(cookbook_helper.file_exists?).to be(true)
  end

  it '`View` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "View", if: cookbook_helper.file_and_class_valid? do

  let(:view) { View.new() }

  describe '#display' do
    it 'should implement a method to display recipes' do
      recipes = []
      recipes << RecipeFactory.build('Winter Soup', 'Warm vegetable soup')
      allow(STDOUT).to receive(:puts)
      view.display(recipes)

      expect(STDOUT).to have_received(:puts).with(/.*(Winter Soup).*/)
    end
  end
end
