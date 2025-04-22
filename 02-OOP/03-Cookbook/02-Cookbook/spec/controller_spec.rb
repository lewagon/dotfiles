require_relative 'cookbook_helper'

begin
  require "cookbook"
  require "controller"
rescue LoadError
end

cookbook_helper = CookbookHelper.new(
  file_name: "controller",
  class_name: "Controller"
)

describe "Controller", unless: cookbook_helper.file_and_class_valid? do
  it '`controller.rb` file should exist' do
    expect(cookbook_helper.file_exist?).to be(true)
  end

  it '`controller.rb` can require and require_relative files without errors' do
    require "controller"
  rescue LoadError => e
    raise cookbook_helper.require_error(e)
  end

  it '`Controller` class should be defined' do
    expect(cookbook_helper.class_defined?).to be(true)
  end
end

describe "Controller", if: cookbook_helper.file_and_class_valid? do
  let(:cookbook) { Cookbook.new }
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

  describe '#add' do
    it 'should implement a method to add a cookbook recipe' do
      expect(controller).to respond_to :add
    end
  end

  describe '#remove' do
    it 'should implement a method to remove a cookbook recipe' do
      expect(controller).to respond_to :remove
    end
  end
end
