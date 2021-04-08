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
      expect(cow.instance_variable_get(:@milk)).to eq 0
    end

    it "should set the cow's name" do
      expect(cow.instance_variable_get(:@name)).to eq "Rebecca"
    end

    it "should set the cow's weight to 400000g" do
      expect(cow.instance_variable_get(:@weight)).to eq 400_000
    end
  end

  describe '#feed!' do
    it 'should override the `feed!` method' do
      expect(Cow.instance_methods(false)).to include(:feed!)
    end

    it 'should add 1 liter of milk' do
      cow.feed!
      expect(cow.instance_variable_get(:@milk)).to eq 1
      cow.feed!
      expect(cow.instance_variable_get(:@milk)).to eq 2
    end

    it 'should add 1 gram of weight' do
      cow.feed!
      expect(cow.instance_variable_get(:@weight)).to eq 400_001
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
