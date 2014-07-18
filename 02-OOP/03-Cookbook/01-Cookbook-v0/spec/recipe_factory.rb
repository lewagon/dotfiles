begin
  require 'recipe'
rescue LoadError
  class Recipe; end
end

class RecipeFactory
  def self.build(name, description)
    if Recipe.allocate.method(:initialize).arity == 1
      attributes = {
        name: name,
        description: description
      }
      Recipe.new(attributes)
    else
      Recipe.new(name, description)
    end
  end
end