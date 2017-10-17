begin
  require "controller"
rescue LoadError
  class Controller; end
end

describe Controller do
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
