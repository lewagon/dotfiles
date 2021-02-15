require_relative "crop"

class Rice < Crop
  def water!
    @grains += 5
  end

  def transplant!
    @grains += 40
  end
end
