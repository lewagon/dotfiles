class Bicycle
  attr_reader :gears, :wheels, :seats

  def initialize(gears = 1)
    @wheels = 2
    @seats = 1
    @gears = gears
  end
end

class Tandem < Bicycle
  def initialize(gears)
    super(gears)
    @seats = 2
  end
end

def quiz
  answers = []

  b = Bicycle.new
  t = Tandem.new(4)

  # TODO: replace "?" by the correct integer!

  answers << (b.gears == "?")
  answers << (b.wheels == "?")
  answers << (b.seats == "?")

  answers << (t.gears == "?")
  answers << (t.wheels == "?")
  answers << (t.seats == "?")

  answers.reduce(true) do |result, answer|
    result && answer
  end
end
