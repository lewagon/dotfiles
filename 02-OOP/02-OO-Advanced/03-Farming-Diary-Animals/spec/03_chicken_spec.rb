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

  let(:female_chicken) { Chicken.new('female') }
  let(:male_chicken) { Chicken.new('male') }


  describe '#initialize' do
    it 'should take one parameter' do
      initialize_parameters_count = Chicken.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 1
    end

    it "should define an instance variable @eggs" do
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 0
    end

    it "should set the chicken's gender" do
      expect(male_chicken.instance_variable_get(:@gender)).to eq "male"
      expect(female_chicken.instance_variable_get(:@gender)).to eq "female"
    end

    it "should set the chicken's energy to 0" do
      expect(male_chicken.instance_variable_get(:@energy)).to eq 0
      expect(female_chicken.instance_variable_get(:@energy)).to eq 0
    end
  end

  describe '#feed!' do
    it 'should extend the `feed!` method' do
      expect(Chicken.instance_methods(false)).to include(:feed!)
    end

    it 'should add 2 eggs if the chicken is a female' do
      female_chicken.feed!
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 2
      female_chicken.feed!
      expect(female_chicken.instance_variable_get(:@eggs)).to eq 4
    end

    it 'should not add eggs if the chicken is a male' do
      male_chicken.feed!
      expect(male_chicken.instance_variable_get(:@eggs)).to eq 0
    end

    it 'should add 1 energy' do
      female_chicken.feed!
      expect(female_chicken.instance_variable_get(:@energy)).to eq 1
      male_chicken.feed!
      expect(male_chicken.instance_variable_get(:@energy)).to eq 1
    end
  end


  describe '#talk' do
    it 'should return a "cock-a-doodle-doo" for a male' do
      expect(male_chicken.talk).to eq("cock-a-doodle-doo")
    end

    it 'should return a "cluck cluck" for a female' do
      expect(female_chicken.talk).to eq("cluck cluck")
    end
  end

  describe '#eggs' do
    it "have appropriate getters and/or setters" do
      expect(female_chicken).to respond_to :eggs
      expect(female_chicken).not_to respond_to(:eggs=)
    end
  end
end
