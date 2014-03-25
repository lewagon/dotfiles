## Background and Objectives
This exercise is a synthesis which validates the core concepts you have seen so far, common to most programming languages:

- Variables and methods
- Program flow and control structures
- manipulation of strings and arrays


## Specs
- Implement the `#play_game` method which runs a Black Jack game from the terminal. It should work this way. 

```
$ Card ? (type 'Y' for a new car)
$ > yes
$ Your score is 6, bank is 17 !
$ Card ? (type 'Y' for a new card)
$ > yes
$ Your score is 16, bank is 17 !
$ Card ? (type 'Y' for a new card)
$ > yes
$ Your score is 19, bank is 17 !
$ Card ? (type 'Y' for a new card)
$ >
$ Yourbeat the bank ! you win.
```
- For each game, a new bank score is randomly picked in `16..21`.
- The user isn't asked to pick a new card if his score gets above 21 (he will loose in that case)
- each card value is randomly picked in `1..11`
- **constraint**: the `#play_game` should return the outcome of a black jack game, which we impose to be an array containing the bank's score and the player's score. Ex: bank gets 17, you get 19, the method should return `[17, 19]`.

- Implement the `#build_message_for` method which analyze the outcome of the black jack game and returns a custom string
- **constraint**: the `#build_message_for` method should return one of the following strings, depending on the game outcome :
 - `"you are over 21.. you loose."` if the user gets above 21.
 - `"Black Jack !"` if the user gets 21.
 - `"You beat the bank ! you win."` if the user gets a better score than the bank.
 - `"Bank beats you ! you loose."` if the user gets a worse score than the bank.
 
- **enhancement**: If you want to enhance your program to be closer to the real rules, here's some help :) http://fr.wikipedia.org/wiki/Blackjack_(jeu)