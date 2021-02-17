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
  end

  describe '#feed' do
    it 'should implement a method to feed the animal' do
      Animal.public_method_defined? :feed
    end

    it 'should return a string' do
      expect(animal.feed).to eq "Edward is eating"
    end
  end

  describe '#collar' do
    it "should implement a method to read the animal's collar" do
      Animal.public_method_defined? :collar
    end

    it 'should return a string' do
      expect(animal.collar).to eq "Name: Edward"
    end
  end

  describe 'instance variables' do
    it "have appropriate getters and setters" do
      expect(animal).to respond_to :name
      expect(animal).not_to respond_to(:name=)
    end
  end
end
