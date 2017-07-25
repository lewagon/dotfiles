## Background & Objectives

Build a [results page with a sticky map](https://lewagon.github.io/layouts-demo/flexbox-layout.html) like in Karr lecture. Implement this layout in the `layouts/map.css` file.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png" alt="" width="100%">
</div>

## Starting the challenge

1. Make sure you understand the code in `index.html`, and the design we give you for navbar and cards in `components/navbar.css` and `components/card.css`. Ask questions if it's not the case.
2. Go back to Karr lecture to rehearse how you can build a layout using **flexbox** and `position: sticky`
3. **Don't cheat and don't inspect the code of our solution!** The goal of this challenge is that you really know how to build a layout by yourself. So take you time to think and raise tickets if you're stuck, but don't cheat 😉!

## New CSS organization

Notice that we now have **two folders** in our CSS:

- `components` to code all our graphical components.
- `layouts` to code the different layouts of our website.

As usual, `style.css` is importing all the other stylesheets and then is linked in the HTML.

## Gmaps javascript and `!important` keyword

When a javascript code is injecting CSS into the HTML (e.g. what Gmaps javascript is doing), you must use the keyword `!important` in your CSS to override the CSS injected by the javascript code.

For instance, Gmaps javascript put a `position: relative;` on the map. To override this in your CSS you must write:

```css
#map {
  position: sticky !important;
}
```
