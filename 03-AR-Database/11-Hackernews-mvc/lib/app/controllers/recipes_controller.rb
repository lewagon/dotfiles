require_relative '../models/recipe'
require_relative '../views/view'

class RecipeController
  
  def initialize(user)
    @user = user
    @recipes = @user.recipes
  end
  
  def run
    while true
      puts "what do you wanna do #{@user.name}? [options: add, list, delete]"
      @command = gets.chomp.split(' ')
      first = @command.shift
      break if first == "exit"
      case first
      when 'add'
        add
      when 'list'
        list
      when 'delete'
        delete
      else
        puts "Please enter add, list, delete, or complete"
      end
    end
  end
  
  def list
    @recipes = @user.recipes(true) # Forcing not to use cached association !
    View.show(@recipes)
  end
  
  def delete
    id = @command.first.to_i
    recipe = @recipes.find(id)
    name = recipe.name
    recipe.destroy
    View.delete(name)
  end
  
  def add
    name = @command.join(' ')        
    @recipes.create(name: name)
    View.add(name)
  end
  
end

