require_relative 'cookbook_helper'

begin
  require "controller"
rescue LoadError
end

cookbook_helper = CookbookHelper.new(
  file_name: "controller",
  class_name: "Controller"
)

describe "Controller", unless: cookbook_helper.file_and_class_valid? do
  it '`controller.rb` file should exist' do 
    expect(cookbook_helper.file_exists?).to be(true)
  end

  it '`Controller` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "Controller", if: cookbook_helper.file_and_class_valid? do
  let(:csv_path) { "spec/recipes.csv" }
  let(:cookbook) { Cookbook.new(csv_path) }
  let(:controller) { Controller.new(cookbook) }

  describe '#initialize' do
    it 'should store the Cookbook in an instance variable' do
      expect(controller
        .instance_variable_get(:@cookbook))
        .to be_a Cookbook
    end
  end

  describe '#list' do
    it 'should implement a method to list cookbook recipes' do
      expect(controller).to respond_to :list
    end
  end

  describe '#create' do
    it 'should implement a method to create a cookbook recipe' do
      expect(controller).to respond_to :create
    end
  end

  describe '#destroy' do
    it 'should implement a method to destroy a cookbook recipe' do
      expect(controller).to respond_to :destroy
    end
  end
end
