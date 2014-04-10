class Playboy
  
  #TODO: implement necessary getters or setters to run meeting_casanova.rb
  
  def initialize(name, nationality)
    @conquests = []
    @name, @nationality = name, nationality   
    @hair_length = 20 # beautiful long playboy hair
  end
  
  def meets(lady)
    @conquests << lady unless @married
  end
  
end
