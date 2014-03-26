class Playboy
  
  def initialize(name, nationality)
    @conquests = []
    @name, @nationality = name, nationality   
    @married = false 
    @status = "single"
  end
  
  def meets(lady)
    @conquests << lady unless @married
  end
  
  def marry(lady)
    @married = true
  end
  
end

# 1. Set nationality getter or setter 
casanova = Playboy.new("Giacomo Casanova", "Italian")
puts casanova.nationality

# 2. Set conquests getter or setter 
casanova.meets("Giullia")
casanova.meets("Louisia")
casanova.conquests.each_with_index {|conquest, index| puts "conquest #{index + 1} : #{conquest}"}

# 3. Set status getter or setter 
# Casanova gets married.. 
casanova.marry("Giorgia")
casanova.status = "married"

# 4. Set status getter or setter 
puts casanova.status
