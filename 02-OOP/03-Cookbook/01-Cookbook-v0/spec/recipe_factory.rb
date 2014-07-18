begin
  require 'recipe'
rescue LoadError
  class Recipe; end
end

class RecipeFactory
  def self.build(name, description)
    if Recipe.allocate.method(:initialize).arity == 2
      Recipe.new(name, description)
    else
      attributes = {
        name: name,
        description: description
      }
      Recipe.new(attributes)
    end
  end
end