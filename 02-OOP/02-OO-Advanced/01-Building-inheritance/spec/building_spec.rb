require 'building'

describe House do

  let(:cottage) { House.new('Country Cottage', 20, 40) }

  describe 'inheritance' do
    it 'should extend House with the instance variables of Building' do
      expect(cottage.instance_variables.sort).to eq([:@length, :@name, :@width])
    end

    it 'should extend House with #floor_area' do
      expect(House.superclass).to eq(Building)
      expect(House.method_defined?(:floor_area)).to eq(true)
    end
  end
end
