def word_contains_two_p(sentence)
  # TODO: return the first word in `sentence` containing two `p`
  regexp = /WRITE YOUR REGEXP HERE/
  sentence.match(regexp)[0]
end

def word_before_exclamation_mark(sentence)
  # TODO: return the word located before an exclamation mark
  # Code Hint: use capture groups
end

def four_letters_word(sentence)
  # TODO: return the following word:
  # - it contains exactly 4 letters
  # - it's located between a space and a comma
  # Code Hint: use capture groups
end

def last_five_letters(sentence)
  # TODO: return the last 5 letters of the sentence
end

def word_contains_ll(sentence)
  # TODO: return the word containing two consecutive "l"
end

def six_letters_word(sentence)
  # TODO: return the following word:
  # - it contains exactly 6 letters
  # - it's composed of letters from "a" to "r"
end

def all_capital_letters(sentence)
  # TODO: capture all the capital letters in the sentence
  # return a string formed with the letters you found
  # Code Hint: use `scan` to get all the occurences
end