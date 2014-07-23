require './models/recipe'
require './models/user'

# Seed you database with recipe data from marmiton
puts "Seeding database..."
# Here is a sample of ingredients (you are free to add some !)
ingredients = ["curry", "crevettes", "agneau", "pomme", "orange", "café", "asperges", "celeri", "dorade"]



# creates users with the Faker Gem

# for each user, pick randomly one ingredient or more from the list of ingredients and attach recipes to the user