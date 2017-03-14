require_relative "vending_machine"

def display(vending_machine)
  print "---> Amount: #{vending_machine.amount_cents / 100}€"
  print " - 1 Snack = #{vending_machine.snack_price_cents / 100}€"
  puts  " - Stock: #{vending_machine.snacks}\n\n"
end

# We instantiate a new vending machine selling 2.5 euros snacks. In the beginning
# this machine has a stock of 10 snacks.
vending_machine = VendingMachine.new(250, 10)
puts "Vending machine ready!"
display(vending_machine)

# A client comes and insert some coins
puts "Inserting 2€"
vending_machine.insert_coin(200)
display(vending_machine)

3.times do
  puts "Inserting 0.2€"
  vending_machine.insert_coin(20)
  display(vending_machine)
end

# Then the client pushes the Buy snack button
puts "Pushing 'Buy Snack' button"
vending_machine.buy_snack
display(vending_machine)

# The nthe client pushes the Buy snac button again (but forgot to insert some coins!)
puts "Pushing 'Buy Snack' button"
vending_machine.buy_snack
display(vending_machine)
