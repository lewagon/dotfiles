secret_message = %({
    Reveal the logos' colors:
    Elegant shapes, some have evolved to a very iconized style.
    Definitely a vivid color scheme with bright orange and shiny yellow,
    many shades of blue, oscillating between purple and indigo! but not much green
    })



# TODO: return the word containg two `p` of the sentence
def word_contains_two_p(sentence)
  # Warm-up: code your regex in the provided match
  sentence.match(//)[0]
end

color = word_contains_two_p(secret_message)
puts "The color of Heroku is #{color}"



# TODO: return the word located before an exclamation mark
# Code Hint: use capture groups
def word_before_exclamation_mark(sentence)

end

color = word_before_exclamation_mark(secret_message)
puts "The color of postgresql is #{color}"



# TODO: return the following word:
# - it contains exactly 4 letters
# - it's located between a space and a comma
# Code Hint: use capture groups
def four_letters_word(sentence)

end

color = four_letters_word(secret_message)
puts "The color of CSS3 is #{color}"



# TODO: return the last 5 letters of the sentence
def last_5_characters(sentence)

end

color = last_5_characters(secret_message)
puts "The color of rake is #{color}"



# TODO: return the word containing two consecutive "l"
def word_contains_ll(sentence)

end

color = word_contains_ll(secret_message)
puts "The color of Javascript is #{color}"



# TODO: return the following word:
# - it contains exactly 6 letters
# - it's composed of letters from "a" to "r"
def six_letters_word(sentence)

end

color = six_letters_word(secret_message)
puts "The color of HTML5 is #{color}"



# TODO: capture all the capital letters in the sentence
# return a string formed with the letters you found
# Code Hint: use `scan` to get all the occurences
def all_capital_letters(sentence)

end

color = all_capital_letters(secret_message)
puts "The color of Ruby is #{color}"
