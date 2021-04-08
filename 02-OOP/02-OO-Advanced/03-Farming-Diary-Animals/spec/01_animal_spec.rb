require_relative "helper/file_helper.rb"

begin
  require "animal"
  require "cow"
  require "chicken"
rescue LoadError
end

animal_helper = FileHelper.new(
  file_name: "animal",
  class_name: "Animal"
)

cow_helper = FileHelper.new(
  file_name: "cow",
  class_name: "Cow"
)

chicken_helper = FileHelper.new(
  file_name: "chicken",
  class_name: "Chicken"
)


def all_helpers_valid(helpers)
  return helpers.all? { |helper| helper.file_and_class_valid? }
end

describe "Inheritance", unless: all_helpers_valid([animal_helper, cow_helper, chicken_helper]) do
  
  describe 'Animal' do
    it '`animal.rb` file should exist' do
      expect(animal_helper.file_exists?).to be(true)
    end

    it '`Animal` class should be defined' do
      expect(animal_helper.class_defined?).to be(true)
    end
  end
  
  describe 'Cow' do
    it '`cow.rb` file should exist' do
      expect(cow_helper.file_exists?).to be(true)
    end

    it '`Cow` class should be defined' do
      expect(cow_helper.class_defined?).to be(true)
    end

    it 'should add Animal as superclass' do
      expect(Cow.superclass).to eq(Animal)
    end
  end
  
  describe 'Chicken' do
    it '`chicken.rb` file should exist' do
      expect(chicken_helper.file_exists?).to be(true)
    end
    
    it '`Chicken` class should be defined' do
      expect(chicken_helper.class_defined?).to be(true)
    end

    it 'should add Animal as superclass' do
      expect(Chicken.superclass).to eq(Animal)
    end
  end
end


describe "Animal", if: animal_helper.file_and_class_valid? do

  let(:animal) { Animal.new('Edward') }


  describe '#initialize' do
    it 'should take one parameter' do
      initialize_parameters_count = Animal.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 1
    end

    it "should define an instance variable @name" do
      expect(animal.instance_variable_get(:@name)).to be_a String
    end

    it "should set the animal's name" do
      expect(animal.instance_variable_get(:@name)).to eq "Edward"
    end

    it "should set the animal's energy to 0" do
      expect(animal.instance_variable_get(:@energy)).to eq 0
    end
  end

  describe '#name' do
    it "have appropriate getters and/or setters" do
      expect(animal).to respond_to :name
      expect(animal).not_to respond_to(:name=)
      expect(animal.name).to eq ("Edward")
    end
  end

  describe '#energy' do
    it "have appropriate getters and/or setters" do
      expect(animal).to respond_to :energy
      expect(animal).not_to respond_to(:energy=)
    end
  end

  describe '#feed!' do
    it "should increase the animal's energy by 1" do
      animal.feed!
      expect(animal.instance_variable_get(:@energy)).to eq 1
    end
  end
end
