## Background & Objectives

Build a [results page with a sticky map](https://lewagon.github.io/layouts-demo/campuses-with-map.html) like in the lecture. For this exercise, notice we have not imported Bootstrap anywhere in the `index.html`! You will need to implement this layout in the `pages/cities.css` file without using Bootstrap:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png)

## Starting the challenge

1. Make sure you understand the code in `index.html`, and the design we give you for navbar and cards in `components/navbar.css` and `components/card.css`. If you don't understand it fully, raise a ticket and someone will explain it!
2. Go back to the lecture to rehearse how you can build a layout using `flexbox` and `position: sticky`.
3. **Don't cheat by inspecting the code! 🔎** The goal of this challenge is to teach you how to build a layout by yourself. Take your time to think, ask teachers if you're stuck, but don't cheat 😉

To display the MapBox map, you will need to [get a MapBox API key](https://www.mapbox.com/account/access-tokens/) and make sure you add your own key to the url in the `src` attribute of the `#map` image element.

To test your code and view your page in the browser, launch a web server (don't just open the HTML file in your browser) using the command below:

```
serve
```

As you can see we already coded the `card` component for you, so all you have to do is:
- Build a grid of `.cards` around the `.card`s.
- Build a horizontal layout to have the `.cards` on the left and the `#map` on the right.

**[Tip]** Draw the HTML structure before you get started!

NB: don't forget to **hard refresh** (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!

## New CSS organization

Notice that we now have **two folders** in our CSS:
- `components` to code all our graphical components.
- `pages` to code the layouts of the different pages on our website.

As usual, `style.css` is importing all the other stylesheets and is then linked in the HTML.
