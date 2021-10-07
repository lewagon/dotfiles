require "matrix"
require_relative "ref"

class Board

  def initialize
    @board_width = 39
    @field_rows = 2
    @field_columns = 2
    @margin = 3
    @stats_width = 10

    @corn = Ref.new(label: "Corn", product: :grains, icon: "🌽", bg: "🟫")
    @rice = Ref.new(label: "Rice", product: :grains, icon: "🌾", bg: "🟫")
    @cow = Ref.new(label: "Cow", product: :milk, icon: "🐮", bg: "🟥", roof: true)
    @chicken = Ref.new(label: "Chicken", product: :eggs, icon: "🐔", bg: "🟥", roof: true)
  end

  
  def render_field(ref)
    slots = @field_rows * @field_columns
    f = Array.new(slots) { |i| ref.get_icon(ref.items[i]) }
    f.each_slice(@field_columns).map(&:join)
  end
  
  def render_stat(label, value)
    " #{label}#{value.to_s.rjust(@stats_width - label.length, '.')}"
  end

  def render_block(ref)
    f = render_field(ref)

    f[0] += render_stat(ref.label, ref.count)
    f[1] += render_stat(ref.nice_product, ref.product_count)
    
    if ref.roof
      f.unshift("/⚪️\\".ljust(@stats_width + 5))
      f.unshift(" __".ljust(@stats_width + 5))
    end
    f
  end
  
  def display_sky(string = " " * @board_width)
    puts "\e[48;5;33;1m#{string}\e[0m"
  end
  
  def display_grass(string = " " * @board_width)
    puts "\e[48;5;22;38;255;0m#{string}\e[0m"
  end
  
  def display_title
    puts "\n\n"
    display_sky
    display_sky
    display_sky("~  Farming Diary  ~".center(@board_width))
    display_sky
    display_sky("🌳🌳🌳🌳 🌳       🏡        🌳 🌳🌳🌳🌳")
  end

  def display_main(*items)
    rows = items.max_by(&:length).length
    margin = Array.new(rows) { " " * @margin }
    
    columns = items.flat_map { |item| [margin, item] }
    columns << margin

    matrix = Matrix.columns(columns)
    matrix.to_a.each { |row| display_grass(row.join) }
  end
  
  def display
    display_title
    display_grass
    display_main(render_block(@corn), render_block(@rice))
    # display_main(render_block(@cow), render_block(@chicken))
    display_grass
    puts "\n\n"
  end
end
