secret_message = "
  Reveal the logos' colors:\
  Elegant shapes, some have evolved to a very iconized style.\
  Definitely a vivid color scheme with bright orange and shiny yellow,\
  many shades of blue, oscillating between purple and indigo! but not much green\
"



def word_contains_two_p(sentence)
  # TODO: return the first word in `sentence` containing two `p`
  # Warm-up: code your regex in the provided match
  regexp = /WRITE YOUR REGEXP HERE/
  sentence.match(regexp)[0]
end

color = word_contains_two_p(secret_message)
puts "The color of Heroku is #{color}"



def word_before_exclamation_mark(sentence)
  # TODO: return the word located before an exclamation mark
  # Code Hint: use capture groups

end

color = word_before_exclamation_mark(secret_message)
puts "The color of postgresql is #{color}"



def four_letters_word(sentence)
  # TODO: return the following word:
  # - it contains exactly 4 letters
  # - it's located between a space and a comma
  # Code Hint: use capture groups

end

color = four_letters_word(secret_message)
puts "The color of CSS3 is #{color}"



def last_five_characters(sentence)
  # TODO: return the last 5 letters of the sentence

end

color = last_five_characters(secret_message)
puts "The color of rake is #{color}"



def word_contains_ll(sentence)
  # TODO: return the word containing two consecutive "l"

end

color = word_contains_ll(secret_message)
puts "The color of Javascript is #{color}"



def six_letters_word(sentence)
  # TODO: return the following word:
  # - it contains exactly 6 letters
  # - it's composed of letters from "a" to "r"

end

color = six_letters_word(secret_message)
puts "The color of HTML5 is #{color}"



def all_capital_letters(sentence)
  # TODO: capture all the capital letters in the sentence
  # return a string formed with the letters you found
  # Code Hint: use `scan` to get all the occurences

end

color = all_capital_letters(secret_message)
puts "The color of Ruby is #{color}"
