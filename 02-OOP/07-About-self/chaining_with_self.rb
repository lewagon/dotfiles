class Animal
  # Modify the following methods to enable chaining !
  
  def name(name)
    #TODO: find good instruction
  end
  
  def specie(specie)
    #TODO: find good instruction
  end
  
  def color(color)
    #TODO: find good instruction
  end
  
  def natural_habitat(natural_habitat)
    #TODO: find good instruction
  end
  
end

# Testing chaining
fox = Animal.new.name("Fox").specie("mammals").color("red")
fox.natural_habitat("forest")
p fox
