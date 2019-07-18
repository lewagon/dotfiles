class Animal
  def name(name)
    @name = name
    # TODO: what should this method return?
  end

  def species(species)
    @species = species
    # TODO: what should this method return?
  end

  def color(color)
    @color = color
    # TODO: what should this method return?
  end

  def natural_habitat(natural_habitat)
    @natural_habitat = natural_habitat
    # TODO: what should this method return?
  end

  def to_s
    "Name: #{@name}, Species: #{@species}, Color: #{@color}, Natural Habitat: #{@natural_habitat}"
  end
end
