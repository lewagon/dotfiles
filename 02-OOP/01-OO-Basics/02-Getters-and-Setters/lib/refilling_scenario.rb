require_relative "vending_machine"

def display(vending_machine)
  puts "---> Amount: #{vending_machine.amount_cents / 100}€ - Stock: #{vending_machine.snacks}\n\n"
end

# We instantiate an **empty** vending machine selling 2.5 euros snacks.
vending_machine = VendingMachine.new(250, 0)
puts "Vending machine ready!"
display(vending_machine)

# A technician comes and refill the vendinc machine with 20 snacks.

puts "Technician filling machine with 20 snacks"
vending_machine.snacks = vending_machine.snacks + 20
display(vending_machine)
