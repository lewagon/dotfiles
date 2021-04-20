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

  let(:cow) { Cow.new }


  describe '#initialize' do
    it 'should not take any parameters' do
      initialize_parameters_count = Cow.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 0
    end

    it "should define an instance variable @milk" do
      expect(cow.instance_variable_get(:@milk)).to eq 0
    end

    it "should set the cow's energy to 0" do
      expect(cow.instance_variable_get(:@energy)).to eq 0
    end
  end

  describe '#feed!' do
    it 'should extend the `feed!` method' do
      expect(Cow.instance_methods(false)).to include(:feed!)
    end

    it 'should add 2 liters of milk' do
      cow.feed!
      expect(cow.instance_variable_get(:@milk)).to eq 2
      cow.feed!
      expect(cow.instance_variable_get(:@milk)).to eq 4
    end

    it 'should add 1 energy' do
      cow.feed!
      expect(cow.instance_variable_get(:@energy)).to eq 1
    end
  end

  describe '#talk' do
    it 'should return "moo"' do
      expect(cow.talk).to eq("moo")
    end
  end

  describe '#milk' do
    it "have appropriate getters and/or setters" do
      expect(cow).to respond_to :milk
      expect(cow).not_to respond_to(:milk=)
    end
  end
end
