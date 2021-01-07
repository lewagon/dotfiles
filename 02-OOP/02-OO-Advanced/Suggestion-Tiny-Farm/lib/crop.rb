class Crop
  attr_reader :grains

  def initialize
    @grains = 0
    @age = 0
  end

  def ripe?
    @grains.positive?
  end

  def one_day_passes!
    @age += 1
  end
end


class Corn < Crop
  def one_day_passes!
    super
    @grains += 10 if @age > 2
  end
end


class Rice < Crop
  def one_day_passes!
    super
    @grains += 5 if @age > 1
  end

  def irrigate!
    @grains += 40
  end
end
