class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def hug
    puts "#{@name} is happy"
  end
end
