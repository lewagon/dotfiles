require 'matrix'
require_relative 'string'

COLORS = [52, 124, 208, 52, 124, 208]
CHARACTERS = 20
LINES = 12
MARGIN = " " * 10
EMPTY = " " * CHARACTERS
MARGINS = Array.new(LINES) { |m| MARGIN }
SPACER =  (" " * ((CHARACTERS - 10) / 2)).brown
NEUTRAL = 240
GOOD = [
  MARGIN,
  "    " + "  ".green + "    ",
  "  " + "  ".green + "  " + "  ".green + "  ",
  "    " + "  ".green + "    ",
  MARGIN,
  MARGIN,
  MARGIN,
  MARGIN
]

BAD = [
  MARGIN,
  "  " + "  ".red + "  " + "  ".red + "  ",
  "    " + "  ".red + "    ",
  "  " + "  ".red + "  " + "  ".red + "  ",
  MARGIN,
  MARGIN,
  MARGIN,
  MARGIN
]

INGREDIENTS = {
  top_bread: [" ⎽-°-°°-°-⎽ ".center(CHARACTERS, " ").brown, "(__________)".center(CHARACTERS, " ").brown],
  bread: ["(__________)".center(CHARACTERS, " ").brown]
}


def diff_colors (actual, expected)
  a = actual - ["bread", "bread"]
  e = expected - ["bread", "bread"]
  a.map do |ingredient|
    if(e.find_index(ingredient))
      COLORS[e.find_index(ingredient)]
    else
      NEUTRAL
    end
  end
end

def illustrate_burger(ingredients, message = "", colors= COLORS)
  ingredient_index = -1
  burger = ingredients.reverse
  colors = colors.reverse
  burger[0] = "top_bread" if burger[0] == "bread"
  burger.map!.with_index do |ingredient, index|
    if (ingredient.is_a? String) && INGREDIENTS[ingredient.to_sym]
      INGREDIENTS[ingredient.to_sym]
    elsif ingredient.is_a? String
      ingredient_index += 1
      SPACER + ingredient.center(10, "∙").style(255, colors[ingredient_index] || NEUTRAL) + SPACER
    else
      EMPTY.brown
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
      filler = " " * arg[0].length
      c = Array.new(length - arg.length) { |i| filler }
      c.concat(arg)
    else
      arg
    end
  end
  Matrix.columns(args)
end


def display_burgers(actual, expected, feedback)
  actual = [] if actual.nil?
  diff = diff_colors(actual, expected)
  actual_illustration = illustrate_burger(actual, "~ Actual ~", diff)
  expected_illustration = illustrate_burger(expected, "~ Expected ~", COLORS)
  tick = feedback ? GOOD : BAD

  combined = combine(MARGINS, actual_illustration, tick , expected_illustration)
  combined.to_a.each { |row| puts row.join }

  puts "\n\n"
end
