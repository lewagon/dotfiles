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

def quizz
  answers = []
  
  b = Bicycle.new
  t = Tandem.new(4)  
  
  #TODO: replace "?" by the correct fixnum !
  
  answers << (b.gears == "?")
  answers << (b.wheels == "?")
  answers << (b.seats == "?")
  
  answers << (t.gears == "?")
  answers << (t.wheels == "?")
  answers << (t.seats == "?")
  
  answers.inject(true) {|result, answer| result and answer}
end