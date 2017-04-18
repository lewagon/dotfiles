require_relative 'store'
require_relative 'cart'

# TODO: find the correct data structure to hold the content of your shopping cart
# instead of using nil below
cart = nil

puts 'Here are the available products:'
puts store_items_to_s

# loop forever
loop do
  # ask which product to buy
  puts 'What do you want to buy?'
  product = gets.chomp.downcase

  # break loop if product is empty
  break if product == ''

  if product_in_store?(product)
    add_to_cart(cart, product)
  else
    # otherwise show error
    puts "We don't have any #{product} in store, sorry!"
  end
end

# Display content of basket & total price
puts 'Here is your order:'

puts cart_to_s(cart)

total = cart_total_price(cart, store_items)
puts "Total price: #{total}€"
