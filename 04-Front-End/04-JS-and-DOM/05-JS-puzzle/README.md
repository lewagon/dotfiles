## Background & Objectives

Let's build a puzzle game 🧩
Once you have moved all the numbers inside the puzzle into the right order you will get a notification that you won the game.

![js-puzzle](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/js_puzzle.gif)

## Setup

As usual, you can test your code by running this command:

```bash
serve
```

Then open [`localhost:8000`](http://localhost:8000) in your browser.

## Specs

💡 In this challenge we are going to use a new JavaScript concept: event listeners. You haven't actually learned about event listeners yet (that's the next lecture). But the basic idea is that they can let you trigger code when the user interacts with the page in a specific way. In this case, we're going to listen for when the user clicks on a tile. Because you don't know this syntax yet, you can rely on the code already given to you at the end of the `puzzle.js` file:

```js
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
```

❗ Don't change this code.

What does this code do? Let's break it down line by line:

1. `tiles.forEach((tile) => {`: This is an iteration, similar to `#each` in Ruby. There are many tiles on the screen, and we want the same behavior on all of them. So, the code in the `{}` will be run for each tile on the screen.
2. `tile.addEventListener('click', () => {`: Up to now, our code has always run on _page load_, but that's not the behavior we want in this case. This line makes the browser wait to execute the code _until the user clicks_. So, anything inside of the `{}` is code that will only run when the user clicks on a tile. This is called an **event listener**.
3. `if (canMove(tile)) {`: The `canMove(tile)` function should return `true` or `false` so that the rest only runs if the function returns `true`.
4. `moveTile(tile)` and `checkIfPlayerWins()` are functions that you will write soon (keep reading 👇).

Your goal in order to make everything work is to write the `canMove(tile)`, `moveTile(tile)`, and `checkIfPlayerWins()` functions (in each place where you should add code, there's a comment with "TODO" written in it).

## Check if the tile can move

The code which happens inside an event listener is called **the callback**.
We want to move the tile in the callback, but first we’ve got to check if the tile can move at all. A tile can only move if it has an empty (vertical or horizontal) neighbour.

Let’s implement the function `canMove` to check if a tile has an empty space next to it.
This function should take 1 parameter - the tile itself.

To check if a tile has an empty space next to it you might want to take a look at the [cellIndex](http://help.dottoro.com/ljputote.php) and the [rowIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/rowIndex) to calculate the position of the tile.
Be careful if you need to call these methods on a `tr` or a `td`!

## Move the tile

If you can move the tile then let's move it. Let's implement the `moveTile` function which should switch the empty tile with the one next to it. You need to switch the `.empty` class from the empty tile to the one you just clicked and switch the number of the tile you clicked to the empty one.

## Alert player when they win the game

Lastly, we have to check after each move if the player has won the game. “Winning” in this game means that the tiles are ordered in ascending order.

Let’s code the `checkIfPlayerWins` function which should show an alert if the tiles are in the right order.

Now you can try to solve the puzzle!
