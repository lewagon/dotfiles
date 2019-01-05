## Background & Objectives

Let's go bowling! 🎳

## Specs

Write a function for calculating the score of a Ten-pin bowling game.
The input for the function is a list of pins knocked down per roll for one player.
The function should return the player score.

## Bowling Rules

### General rules

- Each game consists of 10 frames. In each frame the player rolls 1 or 2 balls, except for the 10th frame, where the player will roll 2 or 3 balls.
- The total score is the sum of your scores for the 10 frames
- If you knock down fewer than 10 pins with 2 rolls, your frame score is simply the number of pins knocked down
- If you knock down all 10 pins with 2 rolls (a 'spare'), your score is the amount of pins knocked down **plus a bonus** - the amount of pins knocked down with the **next roll**
- If you knock down all 10 pins with your first roll (a 'strike'), you do not take your second roll. You score the amount of pins knocked down **plus a bigger bonus** - the amount of pins knocked down with the **next 2 rolls**

### Rules for 10th frame

The 10th frame is the last one, so it has _special rules_:

- In case of spare or strike, no more bonus is added
- if the last frame is a spare, player rolls 1 bonus ball (3 rolls total)
- if the last frame is a strike, player rolls 2 bonus balls (3 rolls total)
- if neither a spare, nor a strike is scored, the player does not get the 3rd roll
