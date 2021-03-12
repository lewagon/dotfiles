class Crop
  attr_reader :grains

  def initialize
    @grains = 0
  end

  def ripe?
    @grains >= 20
  end
end
