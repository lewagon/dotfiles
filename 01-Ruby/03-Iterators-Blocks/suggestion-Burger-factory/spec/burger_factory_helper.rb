require 'rspec/expectations'
require 'matrix'
require 'string'


RSpec::Matchers.define :be_ordered_burger do |expected|
  match do |actual|
    actual == expected
  end
  
  failure_message do |actual|
    <<~MESSAGE
      expected:   #{expected}
      got:        #{actual}

      -
    MESSAGE
  end
end

CHARACTERS = 20
LINES = 12
MARGIN = " " * 10
EMPTY = " " * CHARACTERS
MARGINS = Array.new(LINES) { |m| MARGIN }
SPACER =  (" " * ((CHARACTERS - 10) / 2)).brown
NEUTRAL = 240


INGREDIENTS = {
  top_bread: [" ⎽-°-°°-°-⎽ ".center(CHARACTERS, " ").brown, "(__________)".center(CHARACTERS, " ").brown],
  bread: ["    ( ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅)    ".center(CHARACTERS, " ").brown, "      ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅ ̅̅     ".center(CHARACTERS, " ").brown]
}


def diff_colors (actual, expected, colors)
  a = actual - ["bread", "bread"]
  e = expected - ["bread", "bread"]
  # colors.map.with_index { |color, index| e[index] == a[index] ? color : NEUTRAL }
  a.map do |ingredient|
    if(e.find_index(ingredient))
      colors[e.find_index(ingredient)]
    else
      NEUTRAL
    end
  end
end

def illustrate_burger(ingredients, message = "", colors)
  ingredient_index = -1
  burger = ingredients.reverse
  colors = colors.reverse
  burger[0] = "top_bread" if burger[0] == "bread"
  burger.map!.with_index do |ingredient, index|
    if INGREDIENTS[ingredient.to_sym]
      INGREDIENTS[ingredient.to_sym]
    else
      ingredient_index += 1
      SPACER + ingredient.center(10, "∙").style(255, colors[ingredient_index] || NEUTRAL) + SPACER
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


def display_burgers(actual, expected, colors)
  diff = diff_colors(actual, expected, colors)
  actual_illustration = illustrate_burger(actual, "~ Actual ~", diff)
  expected_illustration = illustrate_burger(expected, "~ Expected ~", colors)

  combined = combine(MARGINS, actual_illustration, MARGINS, expected_illustration)
  combined.to_a.each { |row| puts row.join }
end