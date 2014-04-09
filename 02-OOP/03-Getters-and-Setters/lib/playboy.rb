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
