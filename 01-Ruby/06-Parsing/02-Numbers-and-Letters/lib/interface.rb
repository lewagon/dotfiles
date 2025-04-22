require_relative "longest_word"

puts "******** Welcome to the longest word-game!********"
puts "Here is your grid:"
grid = generate_grid(9)
puts grid.join(" ")
puts "*****************************************************"

puts "What's your best shot?"
start_time = Time.now
attempt = gets.chomp
end_time = Time.now

puts "******** Now your result ********"

result = run_game(attempt, grid, start_time, end_time)

puts "Your word: #{attempt}"
puts "Time Taken to answer: #{result[:time]}"
puts "Your score: #{result[:score]}"
puts "Message: #{result[:message]}"

puts "*****************************************************"
