require "spec_helper"
require "controller"

describe Controller do
  let(:csv_path) { "spec/recipes.csv" }
  let(:controller) { Controller.new(csv_path) }

  describe 'when initialized' do
    it 'stores the Cookbook model in an instance variable' do
      controller
        .instance_variable_get(:@cookbook)
        .must_be_instance_of Cookbook
    end
  end

  describe 'model interactions' do
    it 'has a list method' do
      controller.must_respond_to :list
    end

    it 'has a add method' do
      controller.must_respond_to :add
    end

    it 'has a delete method' do
      controller.must_respond_to :delete
    end
  end
end
