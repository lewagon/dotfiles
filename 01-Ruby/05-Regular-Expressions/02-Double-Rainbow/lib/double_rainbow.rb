def color_of_heroku(sentence)
  # TODO: return everything non-digit
  sentence.match(/\D+/)[0]
end

def color_of_postgresql(sentence)
  # TODO: return the last 6 characters of the string
  sentence.match(/\w{6}$/)[0]
end

def color_of_css3(sentence)
  # TODO: return the following word:
  # - it contains exactly 4 letters
  # - it's located between a space and a comma
  sentence.match(/\s(\w{4}),/)[1]
end

def color_of_rake(sentence)
  # TODO: find the word located before a question mark
  sentence.match(/(\w+)\?/)[1]
end

def color_of_javascript(sentence)
  # TODO: find the word containing two consecutive "l"
  sentence.match(/\w+ll\w+/)[0]
end

def color_of_html5(sentence)
  # TODO: return the following word:
  # - it contains exactly 6 letters
  # - it's composed of letters only from a to r
  sentence.match(/[a-r]{6}/)[0]
end

def color_of_ruby(sentence)
  # TODO: capture all the capital letters in the sentence
  # return a String formed with the letters you found
  sentence.scan(/[A-Z]/).join
end