require_relative "animal"

class Chicken < Animal
  attr_reader :eggs

  def initialize(name, gender)
    super(name)
    @gender = gender
    @eggs = 0
  end

  def feed!
    @eggs += 1 if @gender == "female"
  end

  def talk
    case @gender
    when "male" then puts "cock-a-doodle-doo"
    when "female" then puts "cha-caw"
    end
  end

  def hug
    super
    puts "#{name} is running away"
  end
end
