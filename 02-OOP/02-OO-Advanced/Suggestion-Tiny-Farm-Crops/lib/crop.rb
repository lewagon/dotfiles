class Crop
  attr_reader :grains

  def initialize
    @grains = 0
  end

  def ripe?
    @grains >= 30
  end
end
