require_relative "vending_machine"

def display(vending_machine)
  return "---> Amount: #{vending_machine.amount_cents / 100.0}€" \
    " - 1 Snack = #{vending_machine.snack_price_cents / 100.0}€" \
    " - Stock: #{vending_machine.snacks}"
end

# We instantiate an **empty** vending machine selling 2.5 euros snacks.
vending_machine = VendingMachine.new(250, 0)
puts "Vending machine ready!"
puts display(vending_machine)

# A technician comes and refill the vending machine with 20 snacks.
puts "Technician filling machine with 20 snacks"
vending_machine.snacks = vending_machine.snacks + 20
puts display(vending_machine)
