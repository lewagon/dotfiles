class Dessert

  def initialize(name, calories)
  end 
  
  def healthy?
  end
  
  def delicious?
  end
  
end

class JellyBean < Dessert

  def initialize(name, calories, flavor)
  end
  
  def delicious?
  end
  
end

# Testing your code 
jelly = JellyBean.new("jelly bean", 130, "black licorice")
puts jelly.healthy? == true # => true : it inherits healthy? method from the Dessert class
puts jelly.delicious? == false # => true : delicious is over-ridden by the children class implementation !