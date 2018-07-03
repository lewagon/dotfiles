require 'dog'

describe GermanShephard do

  describe 'inheritance' do
    it 'should add Dog as a superclass of GermanShephard' do
      expect(GermanShephard.superclass).to eq(Dog)
    end

    it 'should extend GermanShephard with the instance methods of Dog' do
      expect(GermanShephard.instance_methods).to include(:bark)
    end
  end
end
