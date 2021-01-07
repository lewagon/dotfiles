require 'matrix'

SETTINGS = { 
  today: -1,
  board_width: 50,
  field_rows: 3,
  field_columns: 3,
  margin: 4,
  stats_width: 13
}

ICONS = { Corn: "🌽" , Rice: "🌾", Cow: "🐮", Chicken: "🐔", dirt: "🟫", wood: "🟥"}


def render_stat(label, value)
  r = [0, SETTINGS[:stats_width] - label.to_s.length - value.to_s.length].max
  " #{label}#{'.'* r }#{value}"
end

def render_crops(field, label)
  f = render_field(field, ICONS[:dirt])

  crops = field.select {|item| item.is_a?Crop}
  ripe = "?"
  if crops.length > 0 && crops.all? {|crop| crop.respond_to?(:ripe?)}
    ripe = crops.select{ |crop| crop.ripe? }.length
  end
  
  f[0] += " " + label.ljust(SETTINGS[:stats_width])
  f[1] += render_stat("Crops", crops.length)
  f[2] += render_stat("Ripe crops", ripe)

  f
end

def render_animals(field, product, label)
  f = render_field(field, ICONS[:wood])

  animals = field.select {|item| item.is_a?Animal}
  products = "?"
  if animals.length > 0 && animals.any? {|animal| animal.respond_to?(product)}
    products = animals.reduce(0){ |sum, animal| sum + (animal.respond_to?(product) ? animal.send(product) : 0)}
  end
  
  f[0] += " " + label.ljust(SETTINGS[:stats_width])
  f[1] += render_stat("Animals", animals.length)
  f[2] += render_stat(product.to_s.capitalize, products)
  
  f.unshift("/ ⚪️ \\".ljust(SETTINGS[:stats_width] + 7))
  f.unshift(" ____ ".ljust(SETTINGS[:stats_width] + 7))
  
  f
end

def render_field(field, default = ICONS[:dirt])
  slots = SETTINGS[:field_rows] * SETTINGS[:field_columns]
  f = Array.new(slots) { |i| ICONS[field[i].class.name.to_sym] || default }
  f.each_slice(SETTINGS[:field_columns]).map(&:join)
end

def display_title(day)
  display_sky(" " * SETTINGS[:board_width])
  display_sky("🏡  ".center(SETTINGS[:board_width] - 1))
  display_sky("~  Tiny Farm  ~".center(SETTINGS[:board_width]))
  display_sky("DAY #{day}".center(SETTINGS[:board_width]))
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

def display_board(corn_field, rice_field, barn, coop)
  SETTINGS[:today] += 1
  puts "\n\n"
  display_title(SETTINGS[:today])
  display_grass(' ' * SETTINGS[:board_width])
  display_main(render_crops(corn_field, "CORN FIELD"), render_crops(rice_field, "RICE FIELD"))
  display_main(render_animals(barn, :milk, "BARN"), render_animals(coop, :eggs, "COOP"))
  display_grass(' ' * SETTINGS[:board_width])
  puts "\n\n"
end