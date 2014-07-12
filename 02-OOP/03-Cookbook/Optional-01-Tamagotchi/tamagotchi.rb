class Tamagotchi

  def initialize(name)
  end
  
  def feed
  end

  def take_to_bathroom
  end

  def put_to_bed
  end
  
  def awake
  end
  
  def play
  end
  
  private
  # "private" means internal to the object. 
  # You can feed your tamagotchi but can't ask him whether he's hungry
  
  def hungry?
  end
  
  def poopy?
  end
  
  def exhausted?
  end
  
  def time_goes_by
    # Main tamagotchi logic might be written in this method
  end
end


# Your program to interact with the Tamagotchi
puts "Which name for your tamagotchi ?"
name = gets.chomp
pet = Tamagotchi.new(name)

while true
  puts 'commands: feed, play, awake, take to bathroom, put to bed'
  command = gets.chomp
  
  # Rest of the loop is yours !
end
  



