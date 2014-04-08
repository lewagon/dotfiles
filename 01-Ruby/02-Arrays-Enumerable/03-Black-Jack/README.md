## Background and Objectives
This exercise is a synthesis to validate the core concepts you have seen so far, common to most programming languages:

- Getting user input
- Variables and methods
- Program flow and control structures
- Manipulation of strings and arrays

### Black Jack Rules
In our simplified version of the Black Jack, here is how a game goes :

- The player starts with no card and thus a score of 0
- The bank starts with a score between 16 and 21

- For each round, the player can:
  - Shuffle a random card with value between 1 and 11. This number will be added to his score.
  - Pass, and finish the game.

- If the player passes his turn or reaches a score > to 21, the game is over.

- From there we have 4 scenarios :
  - If the player score is 21, he pulls a "Black Jack" and wins.
  - If the player score is > to the bank, he wins.
  - If the player score is < to the bank, he looses.
  - If the player score is > to 21, he looses.

## Specs

### black_jack.rb

- Implement `#bank_score` which will return a random bank score between 16 and 21.
- Implement `#pick_card` which will return a random card value between 1 and 11.
- Implement `#game_outcome` which will return an array containing the bank score and the user score
  - **constraint**: the `#game_outcome` should return the outcome of a black jack game, which we impose to be an array containing the bank's score and the player's score. Ex: bank gets 17, you get 19, the method should return `[17, 19]`.

### croupier.rb

- Implement the `#play_game` method which runs a Black Jack game from the terminal. It should work this way :

```
$ Card ? (type 'Y' or 'yes' for a new card)
$ > yes
$ Your score is 6, bank is 17!
$ Card ? (type 'Y' or 'yes' for a new card)
$ > yes
$ Your score is 16, bank is 17!
$ Card ? (type 'Y' or 'yes' for a new card)
$ > yes
$ Your score is 19, bank is 17!
$ Card ? (type 'Y' or 'yes' for a new card)
$ >
$ You beat the bank! You win.
```

- For each game, a new bank score is randomly picked in `16..21`.
- For each round, the user is asked if he wants to pick a card or not
  - If he wants a new card, you add the picked card's value to his score. Afterwards the `#state_of_the_game` should be displayed, telling him what his score is and what's the bank value.
  - Else the game stops and the outcome message is printed

- Implement the `#state_of_the_game` method, which will return the string : `Your score is 16, bank is 17!` with the correct values.

- Implement the `#asking_for_card?` method, which should ask the user if he wants to pick a card and return true or false (true if he answers 'Y' or 'yes', false otherwise)
   - /!\ The user isn't asked to pick a new card if his score gets above 21 (he will loose in that case)

- Implement the `#build_message_for` method which analyze the outcome of the black jack game and returns a custom string. This method takes an array as an argument containing : `[bank, score]`.
- **constraint**: the `#build_message_for` method should return one of the following strings, depending on the game outcome :
 - `"You are over 21... you loose."` if the user gets above 21.
 - `"Black Jack!"` if the user gets 21.
 - `"You beat the bank! You win."` if the user gets a better score than the bank.
 - `"Bank beats you! You loose."` if the user gets a worse score than the bank.

- **enhancement (optional)**: If you want to enhance your program to be closer to the real rules, here's some help :) http://fr.wikipedia.org/wiki/Blackjack_(jeu)


### Run your code :

- You can run the game by typing :

```bash
$ ruby run.rb
```

## Learning badges

- How do you get an user input from the terminal ? What is the `chomp` method used for ?
- What is a loop ?
- What are the different ways of looping ?
- What are the different conditional structures available ?
- What is string interpolation ?
- What is an array, how do you access it's elements ?

## Tips & Resources

 - You might want to use the [Random class](http://www.ruby-doc.org/core-2.1.1/Random.html).
 - When looping for each turn, you need a condition to make your game loop stop at some point. Use the result of the `#asking_for_card?` method to do so.
