## Background & Objectives

Build a [results page with a sticky map](https://lewagon.github.io/layouts-demo/flexbox-layout.html) like in the lecture. Implement this layout in the `layout/map.css` file:

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png" alt="" width="100%">
</div>

## Starting the challenge

1. Make sure you understand the code in `index.html`, and the design we give you for navbar and cards in `components/navbar.css` and `components/card.css`. If you don't understand it fully, raise a ticket and someone will explain it!
2. Go back to lecture to rehearse how you can build a layout using **flexbox** and `position: sticky`
3. **Don't cheat by inspecting the code! 🔎** The goal of this challenge is to teach you how to build a layout by yourself. Take your time to think, ask teachers if you're stuck, but don't cheat 😉!

To display the Google map, you need to launch a web server (not just open the HTML file in your browser):

```
serve
```

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!

In fact, we've loaded the map with a [Gmaps API key](https://developers.google.com/maps/documentation/javascript/get-api-key), and we've set up this key to only accept `localhost:8000` as a domain.

## New CSS organization

Notice that we now have **two folders** in our CSS:

- `components` to code all our graphical components.
- `layouts` to code the different layouts of our website.

As usual, `style.css` is importing all the other stylesheets and is then linked in the HTML.

## Gmaps javascript and `!important` keyword

When javascript code is injecting CSS into the HTML (e.g. what Gmaps javascript is doing), you must use the keyword `!important` in your CSS to override the CSS injected by the javascript code.

For instance, Gmaps javascript put a `position: relative;` on the map. To override this in your CSS you must write:

```css
#map {
  position: sticky !important;
}
```
