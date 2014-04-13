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
  questions = []
  b = Bicycle.new
  t = Tandem.new(4)  
  
  
  questions << t.gears == "?"
  questions << t.wheels == "?"
  questions << t.seats == "?"
  questions << b.gears == "?"
  questions << b.wheels == "?"
  questions << b.seats == "?"
  
  questions.reduce
  
end


# our Bicycle object
b = Bicycle.new
puts "#{b}-gears: #{b.gears}"  
puts "#{b}-wheels: #{b.wheels}"  
puts "#{b}-seats: #{b.seats}" 

# our Tandem object inheriting from bicycle
t = Tandem.new(2)  
puts "#{t}-gears: #{t.gears}"  
puts "#{t}-wheels: #{t.wheels}"  
puts "#{t}-seats: #{t.seats}" 
