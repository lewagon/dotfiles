require 'clipboard'
require 'securerandom'

secure_random_10 = SecureRandom.hex(10)
capital_letter   = ('A'..'Z').to_a.sample
last_char        = ['/','!','?'].sample

password = secure_random_10 + capital_letter + last_char

Clipboard.copy(password)

puts ""
puts "Thanks!"
puts "Password was copy to your clipboard"
