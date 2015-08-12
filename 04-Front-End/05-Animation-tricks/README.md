#### Disclaimer

There's a small mistake in the video. For the navbar scroll animation, you don't need to log the scroll **event** as done in the video. Instead you can simply call the `scrollTop()` function **on the window itself** to get the number of pixel scrolled from the top of the page.

```javascript
$(window).on("scroll", function(e){
  // No need to console.log(e) as in the video

  // Instead get top scroll position with
  console.log($(this).scrollTop());
});
```

#### `01-Bootstrap-modal`
In this challenge, learn to insert Bootstrap modals on a sign-up example. Don't spend too much time on this challenge, this is pretty much a copy/paste exercise.

#### `02-Bootstrap-popover`
A challenge to play with nice Bootstrap components: [popovers](http://getbootstrap.com/javascript/#popovers).

#### `03-CSS-animation`
When people start coding in jQuery, they often forget they can still make cool stuff using only CSS. A good example: CSS animations.

#### `04-Scroller-coaster`
People often like to play with window scroll event. In this challenge, you will see a series of jQuery animations on scroll, some of them using external js libraries.

#### `04-Wagon-race`
Let's create a JavaScript game: the wagon-race. It's a simple game where you must use your keyboard to make a Wagon go forward.