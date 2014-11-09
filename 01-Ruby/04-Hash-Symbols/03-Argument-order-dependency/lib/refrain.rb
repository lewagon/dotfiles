# Encoding: utf-8

def refrain(lyrics, number_of_times = 1, vibrato = 0, strong = false)
  refrain = []
  lyrics += lyrics[lyrics.size - 1] * vibrato
  lyrics.upcase! if strong

  number_of_times.times do
    refrain << lyrics
  end

  refrain.join(" ")
end

def better_refrain(lyrics, options = { vibrato: 0, number_of_times: 1 })
  # TODO: implement this better version which breaks argument order dependency
end
