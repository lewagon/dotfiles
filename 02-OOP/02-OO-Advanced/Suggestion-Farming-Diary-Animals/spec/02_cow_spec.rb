require_relative "helper/file_helper.rb"

begin
  require "cow"
rescue LoadError
end

cow_helper = FileHelper.new(
  file_name: "cow",
  class_name: "Cow"
)


describe "Cow", if: cow_helper.file_and_class_valid? do

  let(:cow) { Cow.new('Rebecca') }


  describe '#initialize' do
    it 'should take one parameter' do
      initialize_parameters_count = Cow.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 1
    end

    it "should define an instance variable @milk" do
      expect(cow.instance_variable_get(:@milk)).to be_a Integer
    end
  end
  
  describe '#feed' do
    it 'should override the `feed` method' do
      expect(Cow.instance_methods(false)).to include(:feed)
    end

    it 'should add 1 liter of milk' do
      cow.feed
      expect(cow.instance_variable_get(:@milk)).to eq 1
      cow.feed
      expect(cow.instance_variable_get(:@milk)).to eq 2
    end

    it 'should return a string' do
      expect(cow.feed).to eq 'Rebecca is eating'
    end
  end
  
  
  describe '#talk' do
    it 'should return a string' do
      expect(cow.talk).to eq 'moo'
    end
  end
  
  describe '#collar' do
    it 'should be inherited from `Animal`, not duplicated' do
      expect(Cow.instance_methods(false)).not_to include(:collar)
    end
  end

  describe 'instance variables' do
    it "have appropriate getters and setters" do
      expect(cow).to respond_to :milk
      expect(cow).not_to respond_to(:milk=)
    end
  end
end
