class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def feed
    "#{@name} is eating"
  end

  def collar
    "My name is #{name}"
  end
end
