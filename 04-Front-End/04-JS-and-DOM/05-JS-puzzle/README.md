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

For this challenge we are using a new JavaScript concept: an event listener. You will learn more about event listeners in the next lecture so for now it has been written for you in the challenge.
How does it work? We want to execute our JavaScript code only when a specific event happens, not directly on page load (which is what we have done until now). In our case, we want to move our empty tile only when we click on another tile, otherwise nothing should happen. We can do this by adding the following code:

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

Don't change this code at the end of your file, you only need to code the functions which are inside.

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


