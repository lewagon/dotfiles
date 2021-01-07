require_relative "helper/file_helper.rb"
require "crop"

corn_helper = FileHelper.new(
  file_name: "crop",
  class_name: "Corn"
)


describe "Corn", unless: corn_helper.file_and_class_valid? do
  it '`crop.rb` file should exist' do
    expect(corn_helper.file_exists?).to be(true)
  end

  it '`Corn` class should be defined' do
    expect(corn_helper.class_defined?).to be(true)
  end
end

describe "Corn", if: corn_helper.file_and_class_valid? do

  let(:corn) { Corn.new }

  it "Corn constructor (initialize method) should not take any parameters" do
    initialize_parameters_count = Corn.allocate.method(:initialize).arity
    expect(initialize_parameters_count).to eq 0
  end

  it "should have an age" do
    expect(corn.instance_variable_get("age")).to be_a Integer
  end
  
  it "should be 0 years old when created" do
    expect(corn.instance_variable_get("age")).to eq 0
  end
  
  it "should have grains" do
    expect(corn.instance_variable_get("grains")).to be_a Integer
  end
  
  it "should have 0 grains when 0 years old" do
    expect(corn.instance_variable_get("grains")).to eq 0
  end
  
  it "has appropriate getters and setters" do
    expect(corn).not_to respond_to(:age)
    expect(corn).not_to respond_to(:age=)
    expect(corn).to respond_to :grains
    expect(corn).not_to respond_to(:grains=)
  end

end


describe "Corn" do

  it 'should add Crop as a superclass of Corn' do
    expect(Corn.superclass).to eq(Crop)
  end
  
  it 'should extend Crop with the instance methods of Crop' do
    expect(Corn.instance_methods).to include(:one_day_passes!)
  end

  it "should understand #super behavior" do
    expect(quiz).to eq true
  end

end

