## Background and Objectives

This exercise is designed to validate the core concepts you have seen so far, common to most programming languages:
- Read user input / Print output to user
- Variables and methods
- Program execution flow and control structures
- Manipulation of strings and arrays

### Black Jack - Rules

We will implement a *simplified* version of Black Jack:
- The player starts with no cards (score of 0)
- The bank starts with a score between `16` and `21`
- For each round, the player can:
  - Draw a card with a random value between `1` and `11`. This number will be added to his/her score.
  - Draw another, or stick with the current score and finish the game.
- In the end, there are 5 possibilities:
  - If the player's score is > 21, they `"Lose"` (bust).
  - If the player's score is 21, they pull a `"Black Jack"` and win.
  - If the player's score is > than the bank's, they `"Win"`.
  - If the player's score is < than the bank's, they `"Lose"`.
  - If the player's score is == to the bank's, it's a `"Push"`. The player gets their money back.

## Specs

### `black_jack.rb`

- Implement the `#pick_bank_score` method which returns a random bank score between 16 and 21.
- Implement `#pick_player_card` which returns a random card value between 1 and 11.

### `croupier.rb`

- Implement the `#state_of_the_game` method which builds a message containing the bank and player's scores.
- Implement the `#end_game_message` method to be called at the end of the game, containing the game outcome (win, lose or push)

### `interface.rb`

- Implement the main method which runs a Black Jack game from the terminal. It should work this way:

```bash
ruby lib/interface.rb

Card? "y" or "yes" to get a new card
> yes
Your score is 6, bank is 17

Card? "y" or "yes" to get a new card
> yes
Your score is 16, bank is 17

Card? "y" or "yes" to get a new card
> yes
Your score is 19, bank is 17

Card? "y" or "yes" to get a new card
> no
You beat the bank! You win.
```

⚠️ For this exercise you're not finished when `rake` is 100% green! You need to make sure that you can actually play the game by running `ruby lib/interface.rb` 😉

## Key learning points

- What are the different ways of looping?
- What are the different conditional structures available?
- What is string interpolation?

## Further suggestions & resources

- You might want to use the [Random class](https://ruby-doc.org/core-2.7.5/Random.html).
- When looping, you need a condition to make your game loop stop at some point.
