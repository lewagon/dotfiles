require "double_rainbow"
heroku_test = false
postgresql_test = false
css3_test = false
rake_test = false
javascript_test = false
html5_test = false
ruby_test = false

describe "Double Rainbow" do
  before(:all) do
    @secret_message = "Reveal the logos' colors:\
 Elegant shapes, some have evolved to a very iconized style.\
 Definitely a vivid color scheme with bright orange and shiny yellow,\
 many shades of blue, oscillating between purple and indigo! but not much green"
  end

  describe "#word_contains_at_least_two_p" do
    it "returns the first word containing two 'p' or more" do
      test_string = "appropriate perfect apocalypse"
      expect(word_contains_at_least_two_p(@secret_message)).to eq "purple"
      expect(word_contains_at_least_two_p(test_string)).to eq "appropriate"
      heroku_test = true
      puts "    #{colorized("", 53, 2)} Heroku color unlocked"
    end
  end

  describe "#word_before_exclamation_mark" do
    it "returns the word located before an exclamation mark" do
      test_string = "you? me!"
      expect(word_before_exclamation_mark(@secret_message)).to eq "indigo"
      expect(word_before_exclamation_mark(test_string)).to eq "me"
      postgresql_test = true
      puts "    #{colorized("", 25, 2)} postgreql color unlocked"
    end
  end

  describe "#four_letter_word" do
    it "returns the four-letter word starting with 'b'" do
      test_string = " aaaa bbbb, ,cccc"
      expect(four_letter_word(@secret_message)).to eq "blue"
      expect(four_letter_word(test_string)).to eq "bbbb"
      css3_test = true
      puts "    #{colorized("", 27, 2)} CSS3 color unlocked"
    end
  end

  describe "#last_five_letters" do
    it "returns the last five characters" do
      test_string = "This is the best color"
      expect(last_five_letters(@secret_message)).to eq "green"
      expect(last_five_letters(test_string)).to eq "color"
      rake_test = true
      puts "    #{colorized("", 36, 2)} rake color unlocked"
    end
  end

  describe "#word_contains_ll" do
    it "returns the word containing two consecutive 'l'" do
      test_string = "hello from thes specs"
      expect(word_contains_ll(@secret_message)).to eq "yellow"
      expect(word_contains_ll(test_string)).to eq "hello"
      javascript_test = true
      puts "    #{colorized("", 226, 2)} JavaScript color unlocked"
    end
  end

  describe "#six_letter_word" do
    it "returns a six-letter word, composed of letters from 'a' to 'r'" do
      test_string = "egnaro is spelled backward"
      expect(six_letter_word(@secret_message)).to eq "orange"
      expect(six_letter_word(test_string)).to eq "egnaro"
      html5_test = true
      puts "    #{colorized("", 202, 2)} HTML5 color unlocked"
    end
  end

  describe "#all_capital_letters" do
    it "returns all the capital letters as a string" do
      test_string = "ManY COLORS"
      expect(all_capital_letters(@secret_message)).to eq "RED"
      expect(all_capital_letters(test_string)).to eq "MYCOLORS"
      ruby_test = true
      puts "    #{colorized("", 196, 2)} Ruby color unlocked"
    end
  end
end

describe "Badges" do
  it "" do
    display_heroku = test_helper("Heroku", 53, heroku_test)
    display_postgresql = test_helper("postgresql", 25, postgresql_test)
    display_css3 = test_helper("CSS3", 27, css3_test)
    display_rake = test_helper("rake", 36, rake_test)
    display_javascript = test_helper("JavaScript", 226, javascript_test)
    display_html5 = test_helper("HTML5", 202, html5_test)
    display_ruby = test_helper("Ruby", 196, ruby_test)

    color_line = "#{display_heroku[:color]}\
#{display_postgresql[:color]}\
#{display_css3[:color]}\
#{display_rake[:color]}\
#{display_javascript[:color]}\
#{display_html5[:color]}\
#{display_ruby[:color]}"

    puts "\n"
    puts color_line
    puts color_line
    puts "#{display_heroku[:title]}\
#{display_postgresql[:title]}\
#{display_css3[:title]}\
#{display_rake[:title]}\
#{display_javascript[:title]}\
#{display_html5[:title]}\
#{display_ruby[:title]}"
    puts color_line
    puts color_line
    puts "\n\n"
  end
end


def test_helper(name, color, test_variable)
  {
    color: test_variable ? colorized("", color) : colorized(),
    title: test_variable ? colorized(name, color) : colorized(name)
  }
end

def colorized(string = "", color = 238, size = 12)
  return "\e[48;5;#{color};38;5;15m#{string.center(size)}\e[0m"
end
