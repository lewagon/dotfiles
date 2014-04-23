require_relative 'parser'

(1..5).each do |i|
  User.create(name: Faker::Name.name, email: Faker::Internet.email)
end

ingredients = %w(boeuf couteaux bar)
ingredients.each do |ingredient|
  (1..3).each do |difficulty|
    MarmitonScraper.extract_recipes(ingredient, difficulty).each do |recipe|
      recipe = Recipe.create(recipe)
      recipe.user = User.find(rand(1..5))
      recipe.save
    end
  end
end