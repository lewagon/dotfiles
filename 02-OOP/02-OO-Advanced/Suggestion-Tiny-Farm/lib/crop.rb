class Crop
  attr_reader :grains

  def initialize
    @grains = 0
  end

  def harvest!
    @grains = 0
  end
end

class Rice < Crop
  def water!
    @grains += 5
  end
end

class Corn < Crop
  def water!
    @grains += 10
  end

  def weed!
    @grains += 40
  end
end


