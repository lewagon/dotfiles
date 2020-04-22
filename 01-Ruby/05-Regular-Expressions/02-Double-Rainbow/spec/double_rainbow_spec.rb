require "double_rainbow"

describe "Double Rainbow" do
  before(:all) do
    @secret_message  = %({
      Reveal the logos' colors:
      Elegant shapes, some have evolved to a very iconized style.
      Definitely a vivid color scheme with bright orange and shiny yellow, many shades of blue, oscillating between purple and indigo! but not much green
      })
  end

  describe "#word_contains_two_p" do
  it "should return the word containg two `p`" do
      test_string = "perfect apocalypse"
      expect(word_contains_two_p(@secret_message)).to eq "purple"
      expect(word_contains_two_p(test_string)).to eq "apocalypse"
      display_colorized("Heroku", 53)
    end
  end

  describe "#word_before_exclamation_mark" do
    it "should return the word located before a question mark" do
      test_string = "you? me!"
      expect(word_before_exclamation_mark(@secret_message)).to eq "indigo"
      expect(word_before_exclamation_mark(test_string)).to eq "me"
      display_colorized("postgresql", 25)
    end
  end

  describe "#four_letters_word" do
    it "should return a 4 letters word, located between a space and a comma" do
      test_string = " aaaa bbbb, ,cccc"
      expect(four_letters_word(@secret_message)).to eq "blue"
      expect(four_letters_word(test_string)).to eq "bbbb"
      display_colorized("CSS3", 27)
    end
  end

  describe "#last_5_characters" do
    it "should return the last 5 characters" do
      test_string = "This is the best color"
      expect(last_5_characters(@secret_message)).to eq "green"
      expect(last_5_characters(test_string)).to eq "color"
      display_colorized("rake", 36)
    end
  end

  describe "#word_contains_ll" do
    it "should return the word containing two consecutive `l`" do
      test_string = "hello from thes specs"
      expect(word_contains_ll(@secret_message)).to eq "yellow"
      expect(word_contains_ll(test_string)).to eq "hello"
      display_colorized("Javascript", 226)
    end
  end

  describe "#six_letters_word" do
    it "should return a 6 letters word, composed of letters from `a` to `r`" do
      test_string = "egnaro is spelled backward"
      expect(six_letters_word(@secret_message)).to eq "orange"
      expect(six_letters_word(test_string)).to eq "egnaro"
      display_colorized("HTML5", 202)
    end
  end

  describe "#all_capital_letters" do
    it "should return all the capital letters" do
      test_string = "ManY COLORS"
      expect(all_capital_letters(@secret_message)).to eq "RED"
      expect(all_capital_letters(test_string)).to eq "MYCOLORS"
      display_colorized("Ruby", 196)
    end
  end


  def display_colorized(name, color, size = 30)
    puts "\n"
    puts "  \e[48;5;#{color};38;5;15m#{' ' * size}\e[0m"
    puts "  \e[48;5;#{color};38;5;15m#{name.center(size)}\e[0m"
    puts "  \e[48;5;#{color};38;5;15m#{' ' * size}\e[0m"
    puts "\n"
  end

end
