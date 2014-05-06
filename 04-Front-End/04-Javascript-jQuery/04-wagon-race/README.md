## Background & Objectives

We will create a JavaScript game : the wagon-race.
It's a simple game where you must use your keyboard to make a Wagon go forward.

Each player will advance their "wagon" by smashing some key.  For example, player 1 might be the "q" key and player 2 might be the "p" key.

The goal here is to learn more about JavaScript, jQuery, the DOM, and asynchronous event handling.

Before you start, you should read about [jQuery](http://learn.jquery.com/about-jquery/).  In particular, you should understand event handling and callback functions.

## Specs

You will start by building a simple two-player board.  This will be rendered via HTML. There are a few ways you could do it, e.g., a table that looks like:

#### HTML

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

Then, using CSS, you can provide styles like:

```css
.racer_table td {
  background-color: white;
  height: 20px;
  width: 20px;
}

.racer_table td.active {
  background-color: black;
}
```

You will then update a player's position by adding the `active` class to the appropriate `td`.  There are many other ways to achieve a sensible board output; this is just one suggestion.

Make sure you're able to "manually" produce all the board layouts you might care about before you jump into the JavaScript.  Whatever way you choose, it should be easy for jQuery/JavaScript to manipulate, so keep that in mind.

#### Javascript

We need some way for JavaScript to update the board state. Create simple JavaScript functions that can update a particular player's position.  You give the functions a player position as input and they update the underlying HTML to reflect the new position.

It could look something like:

```javascript
update_player_position('player1', 10);
```

Store this JavaScript in a separate file and use the JavaScript console to debug it and pass in values manually.

##### Binding to Key Presses

Now we'll make the game interactive!  Bind to the [keyup event](http://api.jquery.com/keyup/) to detect when a player has "pressed" a key.  We don't bind to the [keydown](http://api.jquery.com/keydown/) or [keypress](http://api.jquery.com/keypress/) events because those events fire when the keyboard repeats the key, whereas the keyup event doesn't.

It'd be a boring game if you could just hold the key and go.  You want to bind to the `document`, like so:

```javascript
$(document).ready(function() {
  $(document).on('keyup', function(event) {
    // Detect which key was pressed and call the appropriate function
    // Google "jquery keyup what key was pressed" if you don't know how
  });
});
```

##### Starting and Winning

You must provide a way to restart the game, and tell who won the race.

**If this is too simple for you**

Do the same but instead of mere functions, use Javascript object and prototypal inheritance (the Javascript way of creating Classes.)
