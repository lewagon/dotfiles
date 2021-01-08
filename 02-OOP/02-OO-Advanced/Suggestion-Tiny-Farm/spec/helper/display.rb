require "matrix"
require_relative "ref"

SETTINGS = { 
  board_width: 50,
  field_rows: 3,
  field_columns: 3,
  margin: 4,
  stats_width: 13
}

ICONS = { dirt: "🟫", wood: "🟥"}
CORN = Ref.new(product: :grains, label: "Corn", icon: "🌽", bg: ICONS[:dirt])
RICE = Ref.new(product: :grains, label: "Rice", icon: "🌾", bg: ICONS[:dirt])
COW = Ref.new(product: :milk, label: "Cow", icon: "🐮", bg: ICONS[:wood], roof: true)
CHICKEN = Ref.new(product: :eggs, label: "Chicken", icon: "🐔", bg: ICONS[:wood], roof: true)


def render_stat(label, value)
  r = [0, SETTINGS[:stats_width] - label.to_s.length - value.to_s.length].max
  " #{label}#{'.'* r }#{value}"
end


def render_block(items, ref)
  f = render_field(items, ref.bg)

  products = "?"
  if items.length > 0 && items.any? {|item| item.respond_to?(ref.product)}
    products = items.reduce(0){ |sum, item| sum + (item.respond_to?(ref.product) ? item.send(ref.product) : 0)}
  end
  
  f[0] += " " + ref.label.ljust(SETTINGS[:stats_width])
  f[1] += render_stat("Count", items.length)
  f[2] += render_stat(ref.product.to_s.capitalize, products)
  
  if ref.roof
    f.unshift("/ ⚪️ \\".ljust(SETTINGS[:stats_width] + 7))
    f.unshift(" ____ ".ljust(SETTINGS[:stats_width] + 7))
  end

  f
end

def render_field(items, default = ICONS[:dirt])
  slots = SETTINGS[:field_rows] * SETTINGS[:field_columns]
  f = Array.new(slots) { |i| ICONS[items[i].class.name.to_sym] || default }
  f.each_slice(SETTINGS[:field_columns]).map(&:join)
end

def display_title
  display_sky(" " * SETTINGS[:board_width])
  display_sky("🏡  ".center(SETTINGS[:board_width] - 1))
  display_sky("~  Tiny Farm  ~".center(SETTINGS[:board_width]))
  display_sky(" " * SETTINGS[:board_width])
  display_sky("🌳" * (SETTINGS[:board_width] / 2))
end

def display_sky(string)
  puts "\e[48;5;33;1m#{string}\e[0m"
end

def display_grass(string)
  puts "\e[48;5;22;38;255;0m#{string}\e[0m"
end

def display_main(*items)
  rows = items.max_by(&:length).length
  margins = Array.new(rows) { " " * SETTINGS[:margin] }
  border = Array.new(rows) { " " * 3}
  
  columns = items.flat_map { |item| [item, margins] }.tap(&:pop)
  columns.unshift(border)
  columns << border

  matrix = Matrix.columns(columns)
  matrix.to_a.each { |row| display_grass(row.join) }
end


def is_a_class?(class_name)
  Object.const_defined?(class_name.to_s)
end

def select_instances(class_name)
  is_a_class?(class_name) ? ObjectSpace.each_object(Object.const_get(class_name.to_s)).to_a : []
end

def display_board
  corns = select_instances(:Corn)
  rices = select_instances(:Rice)
  cows = select_instances(:Cow)
  chickens = select_instances(:Chicken)
  puts "\n\n"
  display_title
  display_grass(' ' * SETTINGS[:board_width])
  display_main(render_block(corns, CORN), render_block(rices, RICE))
  display_main(render_block(cows, COW), render_block(chickens, CHICKEN))
  display_grass(' ' * SETTINGS[:board_width])
  puts "\n\n"
end