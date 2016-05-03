## Background & Objectives

We want to implement a good old [Minesweeper](https://www.google.com/search?tbm=isch&q=minesweeper+windows), in our browser.

A boilerplate is provided to you so that you can get started faster.
You get:

- `index.html`: containing a 2x2 grid for the game. Up to you to make it bigger.
- `minseweeper.css`: contains classes that you can apply to your table cells (`td`) to display the relevant tile image. The technique used here is to use a svg file as the `background-image`. Tile size is specified to 24 pixels (you can make it bigger or smaller if you want)
- `minesweeper.js`: this is where you should put your code!

## Specs

Take some time to think of the rules of the game. How would you start?

- The boilerplate grid is 2x2, maybe you should make it bigger?
- What is behind each `unopened` tile? How do you store this information?
- What happens when we left-click on a tile? right-click?
- When do we win? When do we lose?

### Going further

If you are done with the basics, you could:

- Change the images
- Add a frame and a little yellow smiley at the top, which puts on sunglasses
  when the game is won, or which restarts a new game when clicked on.
- Add a timer
