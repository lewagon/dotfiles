require "matrix"

class Axis
  attr_reader :units, :legend, :decal
  attr_accessor :top

  def initialize( attr = {} )
    @units = attr[:units]
    @decal = attr[:decal] || 0
    @legend = attr[:legend] || ""
    @top = 0
  end
end

class Graph
  GLYPHES = ["*", "∙"]
  
  def initialize(rows, cols)
    @rows = rows
    @cols = cols
    @graph = coordinate_system
    @searches = {}
  end

  def coordinate_system
    graph = Matrix.build(@rows.units, @cols.units + @cols.decal + 2) do |row, col|
      case col
      when 0...@cols.decal
        " "
      when @cols.decal
        "|"
      when @cols.units + @cols.decal + 1
        "\n"
      else
        " "
      end
    end
    graph.to_a
  end

  def feed(dots)
    extract(dots)

    dots.each do |dot|
      col = (dot[@cols.legend].fdiv(@cols.top) * @cols.units).round + @cols.decal
      row = (dot[@rows.legend].fdiv(@rows.top) * @rows.units).round - 1
      @graph[row][col] = @searches[dot[:search]]
    end
  end
  
  def render
    puts "\n#{@rows.legend}\n\n#{(@rows.top * 10**6).round}\n\n"
    puts @graph.reverse.flatten.join()
    
    puts "#{shift(@cols.decal - 1)} #{'-' * (@cols.units + 1)}"
    puts " 0#{shift(@cols.decal + @cols.units)}#{@cols.top}   #{@cols.legend}\n\n"
    
    @searches.each do |search|
      puts "#{shift(@cols.decal)}#{search[1]} #{search[0]}"
    end
    
    puts "\n\n"
  end
  

  private
  
  def extract(dots)
    @rows.top = top_value(dots, @rows.legend)
    @cols.top = top_value(dots, @cols.legend)
    @searches = all_values(dots, :search)
  end

  def shift(x)
    "#{' ' * x}"
  end
  
  def top_value(arr, by)
    max = arr.max_by { |item| item[by] }
    max[by]
  end

  def all_values(arr, by)
    all = arr.uniq { |item| item[by] }
    all.each_with_index { |item, index| @searches[item[by]] = GLYPHES[index] }
    @searches
  end
end


def display_graph(dots)
  rows = Axis.new(units: 20, legend: :time, decal: 0)
  cols = Axis.new(units: 60, legend: :books, decal: 3)
  graph = Graph.new(rows, cols)
  
  graph.feed(dots)
  graph.render
end
