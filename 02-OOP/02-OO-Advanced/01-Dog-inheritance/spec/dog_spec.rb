require 'german_shepherd'

describe GermanShepherd do

  describe 'inheritance' do
    it 'should add Dog as a superclass of GermanShepherd' do
      expect(GermanShepherd.superclass).to eq(Dog)
    end

    it 'should extend GermanShepherd with the instance methods of Dog' do
      expect(GermanShepherd.instance_methods).to include(:bark)
    end
  end
end
