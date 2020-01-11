def color_of_heroku(specs = nil)
  secret_message = specs || "purple79589"

  # TODO: return the non-digit characters of the secret message

end

def color_of_postgresql(specs = nil)
  secret_message = specs || "somewhatbetweenblueandindigo"

  # TODO: return the last 6 characters of the secret message

end

def color_of_css3(specs = nil)
  secret_message = specs || %({
  Roses are red,
  Violets are blue,
  Sugar is sweet,
  And so are you.
  })

  # TODO: return the following word:
  # - it contains exactly 4 letters
  # - it's located between a space and a comma

end

def color_of_rake(specs = nil)
  secret_message = specs || "red or green?"

  # TODO: find the word located before a question mark

end

def color_of_javascript(specs = nil)
  secret_message = specs || "black letters on a yellow background"

  # TODO: find the word containing two consecutive "l"

end

def color_of_html5(specs = nil)
  secret_message = specs || %({
  The new logo of Firefox has evolved to a more iconized style.
  The color scheme stays the same, with red, orange and yellow shades.
  })

  # TODO: return the following word:
  # - it contains exactly 6 letters
  # - it's composed of letters from "a" to "r"

end

def color_of_ruby(specs = nil)
  secret_message = specs || %({
  Ruby is a dynamic open source programming language.
  Elegant syntax, easy to write...Definitely a progammer's best friend.
  })

  # TODO: capture all the capital letters in the secret message
  # return a string formed with the letters you found
  # (Code Hint: what is more suitable between `match` and `scan`?)
  
end