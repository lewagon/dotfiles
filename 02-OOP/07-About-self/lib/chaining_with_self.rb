class Animal
  # Modify the following methods to enable chaining !
  
  def name(name)
    @name = name
    #TODO: find good instruction
    self
  end
  
  def specie(specie)
    @specie = specie
    #TODO: find good instruction
    self
  end
  
  def color(color)
    @color = color
    #TODO: find good instruction
    self
  end
  
  def natural_habitat(natural_habitat)
    @natural_habitat = natural_habitat
    #TODO: find good instruction
    self
  end
  
  def to_s
    "Name: #{@name}, Specie: #{@specie}, Color: #{@color}, Natural Habitat: #{@natural_habitat}"
  end
  
end