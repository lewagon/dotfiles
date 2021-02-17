require_relative "helper/file_helper.rb"

begin
  require "chicken"
rescue LoadError
end

chicken_helper = FileHelper.new(
  file_name: "chicken",
  class_name: "Chicken"
)


describe "Chicken", if: chicken_helper.file_and_class_valid? do

  let(:female_chicken) { Chicken.new('Laura', 'female') }
  let(:male_chicken) { Chicken.new('Germain', 'male') }


  describe '#initialize' do
    it 'should take two parameter' do
      initialize_parameters_count = Chicken.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 2
    end

    it "should define an instance variable @eggs" do
      expect(female_chicken.instance_variable_get(:@eggs)).to be_a Integer
    end
  end
  
  describe '#feed' do
    it 'should override the `feed` method' do
      expect(Chicken.instance_methods(false)).to include(:feed)
    end

    it 'should add 1 egg if female only' do
      female_chicken.feed
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 1
      female_chicken.feed
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 2
      male_chicken.feed
      expect(male_chicken.instance_variable_get(:@eggs)).to eq 0
    end

    it 'should return a string' do
      expect(female_chicken.feed).to eq 'Laura is eating'
    end
  end
  
  
  describe '#talk' do
    it 'should return a string, different for male and female' do
      expect(male_chicken.talk).to eq 'cock-a-doodle-doo'
      expect(female_chicken.talk).to eq 'cha-caw'
    end
  end
  
  describe '#collar' do
    it 'should override the `collar` method' do
      expect(Chicken.instance_methods(false)).to include(:collar)
    end
    
    it 'should return a string' do
      expect(male_chicken.collar).to eq 'Name: Germain, male'
      expect(female_chicken.collar).to eq 'Name: Laura, female'
    end
  end

  describe 'instance variables' do
    it "have appropriate getters and setters" do
      expect(female_chicken).to respond_to :eggs
      expect(female_chicken).not_to respond_to(:eggs=)
    end
  end
end
