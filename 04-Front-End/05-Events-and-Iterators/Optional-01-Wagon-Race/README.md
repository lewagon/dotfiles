## Background & Objectives

Let's create a JavaScript game: the Wagon Race 🏎. It's a simple game where you use your keyboard to make a Wagon move forward. Each player will move their Wagon by tapping a key (e.g. `Q` for player one, `P` for player two)

The goal here is to learn more about JavaScript, the DOM, and asynchronous event handling.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

## Specs

Open the `index.html` in your browser.

#### HTML

You will start by building a simple two-player board in HTML. There are a few different ways of doing it, but here's one example:

```html
<table class="racer-table">
  <tr id="player1-race">
    <td></td>
    <td class="active"></td>
    <td></td>
    <td></td>
    etc.
  </tr>
  <tr id="player2-race">
    <td></td>
    <td></td>
    <td></td>
    <td class="active"></td>
    etc.
  </tr>
</table>
```

#### CSS

Once your HTML is finished, switch to CSS and design your race track! Example:

```css
.racer-table td {
  height: 40px;
  width: 40px;
}
.racer-table td.active {
  background-repeat: no-repeat;
  background-size: 100%;
}
#player1-race td.active {
  background-image: url("images/player_1.png");
}
#player2-race td.active {
  background-image: url("images/player_2.png");
}
```

You will update a player's position by moving the `active` class from one `td` to the next one. Of course, there are other solutions to implement this game. Using a table and a CSS class is one option. Just make sure you're able to "manually" produce all the board views you might need.

It's always a good idea to do as much work as possible using smart HTML markup and CSS classes before jumping into JavaScript. Bad front-end developers spend time writing long JavaScript code that changes CSS values, instead of short scripts that play nicely with existing CSS classes.

#### JavaScript

Write all your code in `lib/wagon_race.js`. We need a way for JavaScript to update the board state. Create simple JavaScript functions that update a player's position. Again, there are several ways to do the same thing. One example below:

- Remove the `active` class on the current player's `td` and add that class to the next `td`.
- Keep track of the "index" of each player in the table and increase it.


#### Binding to Keyboard

Clicking a button is not fast enough. And you can't play with someone else! Have a look at the `keyup` event:

```js
document.addEventListener("keyup", event => console.log(event));
```

_Do you understand why we use `keyup` and not `keydown`?_

##### Starting and Winning 🏁

Two more final things:

- Find a way to announce the winner of the race
- Find a way to restart the game
