require 'rspec/expectations'
require 'matrix'
require 'string'


RSpec::Matchers.define :be_ordered_burger do |expected|
  match do |actual|
    actual_burger = cook_burger(actual, "~ Actual ~")
    expected_burger = cook_burger(expected, "~ Expected ~")
    <<-HEREDOC
    expected that #{actual} would be #{expected}
    #{display_burger(actual_burger, expected_burger)}
    HEREDOC
    actual == expected
  end
  
  description do |actual|
  end

  failure_message do |actual|
    "expected #{actual} to be ordered burger #{expected}"
  end
end

CHARACTERS = 20
LINES = 12
MARGIN = " " * 10
EMPTY = " " * CHARACTERS
MARGINS = Array.new(LINES) { |m| MARGIN }
SPACER =  (" " * ((CHARACTERS - 10) / 2)).brown

INGREDIENTS = {
  top_bread: [" ⎽-°-°°-°-⎽ ".center(CHARACTERS, " ").brown, "(__________)".center(CHARACTERS, " ").brown],
  bread: ["    ( ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅)    ".center(CHARACTERS, " ").brown, "      ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅     ".center(CHARACTERS, " ").brown]
}


def cook_burger(ingredients, message = "")
  burger = ingredients.reverse
  burger[0] = "top_bread" if burger[0] == "bread"
  burger.map!.with_index do |ingredient, index|
    if INGREDIENTS[ingredient.to_sym]
      INGREDIENTS[ingredient.to_sym]
    else
     SPACER + ingredient.center(10, "∙").style(255, [22, 208, 124, 52][index]) + SPACER
    end
  end

  burger.unshift([ EMPTY , EMPTY.brown, message.center(CHARACTERS, " ").white_brown, EMPTY.brown])
  burger.push([EMPTY.brown, EMPTY])
  burger.flatten
end


def combine(*args)
  length = args.max_by(&:length).length
  args.map! do |arg|
    if arg.length < length
      c = Array.new(length - arg.length) { |i| EMPTY }
      c.concat(arg)
    else
      arg
    end
  end
  Matrix.columns(args)
end


def display_burger(actual, expected)
  combined = combine(MARGINS, actual, MARGINS, expected)
  
  combined.to_a.each do |row|
    puts row.join
  end
end