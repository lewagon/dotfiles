require_relative "helper/file_helper.rb"

begin
  require "crop"
  require "corn"
  require "rice"
rescue LoadError
end

crop_helper = FileHelper.new(
  file_name: "crop",
  class_name: "Crop"
)

describe "Crop", unless: crop_helper.file_and_class_valid? do
  it '`crop.rb` file should exist' do
    expect(crop_helper.file_exist?).to be(true)
  end

  it '`Crop` class should be defined' do
    expect(crop_helper.class_defined?).to be(true)
  end
end


describe "Crop", if: crop_helper.file_and_class_valid? do

  let(:crop) { Crop.new }


  describe '#initialize' do
    it 'should not take any parameters' do
      initialize_parameters_count = Crop.allocate.method(:initialize).arity
      expect(initialize_parameters_count).to eq 0
    end

    it "should define an instance variable @grains" do
      expect(crop.instance_variable_get(:@grains)).to eq 0
    end
  end

  describe '#ripe?' do
    it 'should implement a method to test if the crop is ripe' do
      Crop.public_method_defined? :ripe?
    end

    it 'should return true when the grains is over or equal to 15' do
      expect(crop.ripe?).to be false
      crop.instance_variable_set(:@grains, 15)
      expect(crop.ripe?).to be true
    end
  end

  describe '#grains' do
    it "has appropriate getters and/or setters" do
      expect(crop).to respond_to :grains
      expect(crop).not_to respond_to(:grains=)
    end
  end
end


describe "Inheritance", if: crop_helper.file_and_class_valid? do
  describe "Corn" do
    it 'should inherit from `Crop`' do
      expect(Corn.superclass).to eq(Crop)
    end

    it 'should not duplicate the `Crop` shared methods' do
      expect(Corn.instance_methods(false)).not_to include(:ripe?)
      expect(Corn.instance_methods(false)).not_to include(:initialize)
    end

    it 'should define specific methods' do
      expect(Corn.instance_methods(false)).to include(:water!)
    end
  end

  describe "Rice" do
    it 'should inherit from `Crop`' do
      expect(Rice.superclass).to eq(Crop)
    end

    it 'should not duplicate the `Crop` shared methods' do
      expect(Rice.instance_methods(false)).not_to include(:ripe?)
      expect(Rice.instance_methods(false)).not_to include(:initialize)
    end

    it 'should define specific methods' do
      expect(Rice.instance_methods(false)).to include(:water!)
      expect(Rice.instance_methods(false)).to include(:transplant!)
    end
  end
end
