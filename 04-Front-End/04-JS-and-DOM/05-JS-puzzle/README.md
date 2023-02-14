## Background & Objectives

In this challenge we will build a puzzle game 🧩
Once you have moved all the numbers inside the puzzle into the right order you will get a notification that you won the game.

## Specs

For this challenge we will see a new JavaScript concept: an event listener. You will learn more about event listeners in the next lecture so for it has been written for you in the challenge.
How does it work? When a specific event happens to an element our JavaScript code is executed, not directly on page load. In our case, we want to move our empty tile only when we click on another tile, otherwise nothing should happen. We can do this by adding the following code:

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

So in this challenge we have already selected the DOM elements, we hooked an event listener on them, and now we want to write the code that will run when the event is triggered: **the callback**.

## Check if the tile can move

You want to move the tile in the callback, but first you’ve got to check if the tile can move. A tile can only move if it has an empty (vertical or horizontal) neighbour.

Let’s implement the function `canMove` to check if a tile has an empty space next to it.
This function should take 1 parameter - the tile itself.

To check if a tile has an empty space next to it you might want to take a look at the [cellIndex]("http://help.dottoro.com/ljputote.php") and the [rowIndex]("https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/rowIndex") to calculate the position of the tile.
Be careful if you need to call these methods on a `tr` or a `td`!


## Move the tile

If you can move the tile then let's move it. Let's implement the `moveTile` function which should switch the empty tile with the one next to it. To do this you need to change the `.empty` class and put it on the tile you just clicked and add the number of the tile you clicked to the previously empty tile.


## Alert player when they win the game

You need to check after each move if the player has won the game. “Winning” in this game means that the tiles need to be ordered in ascending order.

Let’s code the `checkIfPlayerWins` function which should show an alert if the tiles are in the right order.


