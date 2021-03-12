require_relative "animal"

class Cow < Animal
  attr_reader :milk

  def initialize(name)
    super(name)
    @milk = 0
  end

  def feed!
    @milk += 1
  end

  def talk
    puts "moo"
  end
end
