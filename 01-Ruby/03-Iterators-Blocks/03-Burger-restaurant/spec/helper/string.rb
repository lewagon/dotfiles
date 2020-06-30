class String
  def style(color = nil, background = nil)
    colors = []
    colors << "48;5;#{background}" unless background.nil?
    colors << "38;5;#{color}" unless color.nil?
    return "\e[#{colors.join(";")}m#{self}\e[0m"
  end

  def brown
    self.style(186, 94)
  end

  def white_brown
    self.style(255, 94)
  end

  def green
    self.style(255, 34)
  end

  def red
    self.style(255, 124)
  end
end