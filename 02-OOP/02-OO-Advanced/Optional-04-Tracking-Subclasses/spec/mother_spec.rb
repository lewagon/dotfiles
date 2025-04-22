require "mother"

class Daughter < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

class Son < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

class RandomClass < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

describe Mother do
  before(:each) do
    Daughter.phoned = false
    Son.phoned = false
    RandomClass.phoned = false
  end

  describe "#phone_kids" do
    it "should phone kids" do
      Mother.phone_kids
      expect(Son.phoned).to eq true
      expect(Daughter.phoned).to eq true
      expect(RandomClass.phoned).to eq true
    end
  end
end
