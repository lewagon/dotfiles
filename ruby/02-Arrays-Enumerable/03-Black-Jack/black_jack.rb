def play_game
  #TODO: make the user play from terminal and return the array of scores [user, bank]
end

def build_message_for(outcome)
  #TODO: return specific message depending on the game outcome (= bank's score and user's score)
end

puts "*** WELCOME TO OUR FANCY BLACKJACK ***"

game_outcome = play_game

result_message = build_message_for(game_outcome)

puts result_message
