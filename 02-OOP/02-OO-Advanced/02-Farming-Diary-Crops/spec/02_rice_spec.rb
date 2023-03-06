require_relative "helper/file_helper.rb"

begin
  require "rice"
rescue LoadError
end

rice_helper = FileHelper.new(
  file_name: "rice",
  class_name: "Rice"
)



describe "Rice", unless: rice_helper.file_and_class_valid? do
  it '`rice.rb` file should exist' do
    expect(rice_helper.file_exist?).to be(true)
  end

  it '`Rice` class should be defined' do
    expect(rice_helper.class_defined?).to be(true)
  end
end


describe "Rice", if: rice_helper.file_and_class_valid? do

  let(:rice) { Rice.new }


  describe '#initialize' do
    it 'should not take any parameters' do
      initialize_parameters_count = Rice.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 0
    end

    it "should define an instance variable @grains" do
      expect(rice.instance_variable_get(:@grains)).to eq 0
    end
  end

  describe '#water!' do
    it 'should implement a method to water the rice crops' do
      Rice.public_method_defined? :water!
    end

    it 'should add 5 grains to the rice crops' do
      rice.water!
      expect(rice.instance_variable_get(:@grains)).to eq 5
      rice.water!
      expect(rice.instance_variable_get(:@grains)).to eq 10
    end
  end

  describe '#ripe?' do
    it 'should implement a method to test if the rice is ripe' do
      Rice.public_method_defined? :ripe?
    end

    it 'should return true when the grains is over or equal to 15' do
      expect(rice.ripe?).to be false
      rice.instance_variable_set(:@grains, 15)
      expect(rice.ripe?).to be true
    end
  end

  describe '#transplant!' do
    it 'should implement a method to transplant the rice crops' do
      Rice.public_method_defined? :transplant!
    end

    it 'should add 10 grains to the rice crops' do
      rice.transplant!
      expect(rice.instance_variable_get(:@grains)).to eq 10
      rice.transplant!
      expect(rice.instance_variable_get(:@grains)).to eq 20
    end
  end

  describe '#grains' do
    it "has appropriate getters and/or setters" do
      expect(rice).to respond_to :grains
      expect(rice).not_to respond_to(:grains=)
    end
  end
end
