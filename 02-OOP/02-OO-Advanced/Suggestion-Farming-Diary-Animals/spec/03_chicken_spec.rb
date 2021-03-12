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
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 0
    end

    it "should set the animal's name" do
      expect(male_chicken.instance_variable_get(:@name)).to eq "Germain"
      expect(female_chicken.instance_variable_get(:@name)).to eq "Laura"
    end

    it "should set the animal's gender" do
      expect(male_chicken.instance_variable_get(:@gender)).to eq "male"
      expect(female_chicken.instance_variable_get(:@gender)).to eq "female"
    end
  end
  
  describe '#feed!' do
    it 'should override the `feed!` method' do
      expect(Chicken.instance_methods(false)).to include(:feed!)
    end

    it 'should add 1 egg if the animal is a female' do
      female_chicken.feed!
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 1
      female_chicken.feed!
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 2
      male_chicken.feed!
      expect(male_chicken.instance_variable_get(:@eggs)).to eq 0
    end
  end
  
  
  describe '#talk' do
    it 'should puts a message (different for male and female)' do
      expect { male_chicken.talk }.to output(/cock-a-doodle-doo/).to_stdout
      expect { female_chicken.talk }.to output(/cha-caw/).to_stdout
    end
  end
  
  describe '#hug' do
    it 'should override the `hug` method' do
      expect(Chicken.instance_methods(false)).to include(:hug)
    end
    
    it "should puts a message that the animal is happy and that it's running away" do
      expect { male_chicken.hug }.to output(/Germain is happy\nGermain is running away/).to_stdout
      expect { female_chicken.hug }.to output(/Laura is happy\nLaura is running away/).to_stdout
    end
  end

  describe '#eggs' do
    it "have appropriate getters and/or setters" do
      expect(female_chicken).to respond_to :eggs
      expect(female_chicken).not_to respond_to(:eggs=)
    end
  end
end
