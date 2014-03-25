def refrain(lyrics, number_of_times = 1, vibrato = 0, strong = nil)
  refrain = []
  lyrics += lyrics[lyrics.size-1] * vibrato
  lyrics.upcase! if strong
  
  number_of_times.times do 
    refrain << lyrics
  end
  
  refrain.join(" ")
end

def better_refrain(lyrics, options = {vibrato: 0, number_of_times: 1})
  
end


# Testing your code
p refrain "hey ya"
p refrain("hey ya", 4, 10, true)

p better_refrain "hey ya"
p better_refrain "hey ya", vibrato: 10, strong: true, number_of_times: 4

