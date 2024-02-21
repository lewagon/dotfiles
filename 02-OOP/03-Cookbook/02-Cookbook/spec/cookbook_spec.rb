require 'recipe_factory'
require_relative 'cookbook_helper'

begin
  require "cookbook"
rescue LoadError
end

cookbook_helper = CookbookHelper.new(
  file_name: "cookbook",
  class_name: "Cookbook"
)

describe "Cookbook", unless: cookbook_helper.file_and_class_valid? do
  it '`cookbook.rb` file should exist' do
    expect(cookbook_helper.file_exist?).to be(true)
  end

  it '`cookbook.rb` can require and require_relative files without errors' do
    require "cookbook"
  rescue LoadError => e
    raise cookbook_helper.require_error(e)
  end

  it '`Cookbook` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "Cookbook", if: cookbook_helper.file_and_class_valid? do
  # Permit Cookbook initialization with zero or one argument(s)
  before do
    @cookbook = Cookbook.new()
  end

  describe "#initialize" do
    it "should create an array `@recipes`" do
      expect(@cookbook.instance_variable_get("@recipes")).to be_a(Array)
    end
  end

  describe "#all" do
    it "should give access to all recipes" do
      @cookbook.instance_variable_set("@recipes", [RecipeFactory.build("Risotto", "Good stuff")])
      expect(@cookbook.all).to be_a(Array)
      expect(@cookbook.all.first).to be_a(Recipe)
    end
  end

  describe "#create" do
    it 'should create and add a recipe to the cookbook' do
      size_before = @cookbook.all.length
      @cookbook.create(RecipeFactory.build("Risotto", "Good stuff"))
      expect(@cookbook.all.length).to eq (size_before + 1)
    end
  end

  describe "#destroy" do
    it 'should remove a recipe from the cookbook' do
      @cookbook.instance_variable_set("@recipes", [RecipeFactory.build("Risotto", "Good stuff")])
      size_before = @cookbook.all.length
      @cookbook.destroy(0)
      expect(@cookbook.all.length).to eq (size_before - 1)
    end
  end
end
