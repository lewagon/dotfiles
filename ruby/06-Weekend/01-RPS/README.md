## Description
In a game of rock-paper-scissors, each player chooses to play Rock (R), Paper (P), or Scissors (S). The rules are: Rock beats Scissors, Scissors beats Paper, but Paper beats Rock. A rock-paper-scissors game is encoded as a list, where the elements are 2-element lists that encode a player’s name and a player’s strategy.
```
[ [ "Bob", "P" ], [ "Mack", "S" ] ]
# => returns the list ["Mack", "S"] wins since S>P
```

Write a method `rps_game_winner` that takes a two-element list and behaves as follows:
+ If the number of players is not equal to 2, raise WrongNumberOfPlayersError
+ If either player's strategy is something other than "R", "P" or "S" (case-insensitive), raise NoSuchStrategyError
+ Otherwise, return the name and strategy of the winning player. If both players use the same strategy, the first player is the winner.

A rock, paper, scissors tournament is encoded as a bracketed array of games - that is, each element can be considered its own tournament.
```ruby 
tournament = [
                 [
                   [ ["Bob", "P"], ["Mack", "S"] ],
                   [ ["Olive", "R"], ["Ben", "S"] ]
                 ],
                 [
                   [ ["Mathieu", "S"], ["Romain", "P"] ],
                   [ ["Wally", "R"], ["Marty", "P"] ]
                 ]
               ]
```
Under this scenario, Mack would beat Bob (S>P), Olive would beat Ben (R>S), and then Mack and Olive would play (Olive wins since R>S); similarly, Mathieu would beat Romain, Marty would beat Wally, and Mathieu and Marty would play (Mathieu wins since S>P); and finally Olive would beat Mathieu since R>S, that is, continue until there is only a single
winner.

+ Write a method rps_tournament_winner that takes a tournament encoded as a bracketed array and returns the winner (for the above example, it should return [“Olive”, “R”]).
+ Tournaments can be nested arbitrarily deep, i.e., it may require multiple rounds to get to a single winner. You can assume that the initial array is well formed (that is, there are 2^n players, and each one participates in exactly one match per round).

## Tip 
* Using recursion (http://en.wikipedia.org/wiki/Recursion_(computer_science)) is cleaner ! 
* Try to understand the conceptual difference between recursion and [iteration](http://en.wikipedia.org/wiki/Iteration#Computing).
