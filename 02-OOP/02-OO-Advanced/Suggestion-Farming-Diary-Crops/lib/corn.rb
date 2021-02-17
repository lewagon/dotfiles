require_relative "crop"

class Corn < Crop
  def water!
    @grains += 10
  end
end
