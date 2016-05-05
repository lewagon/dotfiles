## Background & Objectives

Let's create a JavaScript game: the wagon-race. It's a simple game where you must use your keyboard to make a Wagon go forward. Each player will move his "wagon" by smashing some key (e.g. "q" for player one, "p" for player two)

The goal here is to learn more about JavaScript, jQuery, the DOM, and asynchronous event handling.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

## Specs

#### HTML

You will start by building a simple two-player board in HTML. There are a few ways you could do it, e.g. a table that looks like:

```html
<table class="racer_table">
  <tr id="player1_race">
    <td></td>
    <td class="active"></td>
    <td></td>
    <td></td>
    ... etc ...
  </tr>
  <tr id="player2_race">
    <td></td>
    <td></td>
    <td></td>
    <td class="active"></td>
    ... etc ...
  </tr>
</table>
```

#### CSS

Then switch to CSS and implement your board static design. Example:

```css
.racer_table td {
  height: 40px;
  width: 40px;
}
.racer_table td.active {
  background-repeat: no-repeat;
  background-size: 100%;
}
#player1_race td.active {
  background-image: url("images/player_1.png");
}
#player2_race td.active {
  background-image: url("images/player_2.png");
}
```

You will update a player's position by moving the `active` class from one `td` to the next one. Of course, there are other solutions to implement this game. Using a table and a CSS class is one option. Make sure you're able to "manually" produce all the board views you might care about.

This is always a good idea to do as much work as possible using smart HTML markup and CSS classes before jumping into JavaScript. Bad front-end developers spend time writing long javascript code that change CSS values, instead of short scripts that play nicely combined with CSS classes.

#### Javascript

Write all your code in `game.js`. We need a way for JavaScript to update the board state. Create simple JavaScript functions that can update a particular player's position. You can have several animation strategies for that purpose, for instance:

- Remove the `active` class on the current player's `td` and add this class to the following `td`.
- Keep track of the "index" of each player in the table and increase this index.

**Hint**: depending of your choice, the [next](http://api.jquery.com/next/) and [index](http://api.jquery.com/index/) jQuery functions may be useful!

#### Clicking a button

Now we'll make the game interactive! Add 2 buttons to your page. The first one should make the red wagon move forward, and the second button should make the yellow wagon move forward.


#### Binding to Keyboard

Clicking a button is not fast enough. And you can't play with someone else! Bind to the [keyup event](http://api.jquery.com/keyup/) to detect when a player has "pressed" a key. We don't bind to the [keydown](http://api.jquery.com/keydown/) or [keypress](http://api.jquery.com/keypress/) events because those events fire when the keyboard repeats the key (hence players could cheat by just keeping a key pressed), whereas the keyup event doesn't.

You want to bind to the `document`, like so:

```javascript
$(document).ready(function() {
  $(document).on('keyup', function(event) {
    // Display the ASCII code of the key pressed
    console.log(event.keyCode);
  });
});
```

Here is a handy website when dealing with keyboard events and `keyCode`: [keycode.info/](http://keycode.info/)

##### Starting and Winning

You must provide a way to restart the game, and tell who won the race.

[Optional] Do the same but instead of mere functions, use Javascript object and prototypal inheritance (the Javascript way of creating Classes.)
