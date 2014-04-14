require_relative 'config/application'
require_relative 'app/controllers/recipes_controller'
require_relative 'app/controllers/users_controller'


puts "Put your application code in #{File.expand_path(__FILE__)}"

user = UserController.get_user
recipe = RecipeController.new(user)
recipe.run

