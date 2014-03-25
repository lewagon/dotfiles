class WrongNumberOfPlayersError < StandardError ; end
class NoSuchStrategyError < StandardError ; end

def rps_game_winner(game)
  raise WrongNumberOfPlayersError unless game.length == 2
  # your code here
  "not implemented yet !"
end


def rps_tournament_winner(tournament)
  # your code here
  "not implemented yet !"
end

# Testing winner of a single game
single_game = [ [ "Bob", "P" ], [ "Mack", "S" ] ]
puts rps_game_winner(single_game)
  
# Testing winner of the tournament !
tournament = [
                [
                  [ ["Bob", "P"], ["Mack", "S"] ],
                  [ ["Olive", "R"], ["Ben", "S"] ]
                ],
                [
                  [ ["Mathieu", "S"], ["Romain", "P"] ],
                  [ ["Wally.", "R"], ["Marty", "P"] ]
                ]
              ]
puts rps_tournament_winner(tournament)