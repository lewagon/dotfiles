# 04-Hash-Symbols/02-Modeling-with-Hash
DISHES_CALORIES = {
  "Hamburger" => 250,
  "Cheese Burger" => 300,
  "Big Mac" => 540,
  "McChicken" => 350,
  "French Fries" => 230,
  "Salad" => 15,
  "Coca Cola" => 150,
  "Sprite" => 150
}
MEALS = {
  "Happy Meal" => ["Cheese Burger", "French Fries", "Coca Cola"],
  "Best Of Big Mac" => ["Big Mac", "French Fries", "Coca Cola"],
  "Best Of Royal Cheese" => ["McChicken", "Salad", "Sprite"]
}
def poor_calories_counter(burger, side, beverage)
  DISHES_CALORIES[burger] + DISHES_CALORIES[side] + DISHES_CALORIES[beverage]
end

def calories_counter(orders)
  total = 0
  orders.each do |order|
    if DISHES_CALORIES.key?(order)
      total += DISHES_CALORIES[order]
    else
      total += poor_calories_counter(MEALS[order][0], MEALS[order][1], MEALS[order][-1])
    end
  end
  return total
end
