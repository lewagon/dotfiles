require_relative "animal"

class Chicken < Animal
  attr_reader :eggs

  def initialize(name, gender)
    super(name)
    @gender = gender
    @eggs = 0
  end

  def feed
    @eggs += 1 if @gender == "female"
    super
  end

  def talk
    case @gender
    when "male" then "cock-a-doodle-doo"
    when "female" then "cha-caw"
    end
  end

  def collar
    "#{super}, #{@gender}"
  end
end
