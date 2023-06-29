## Background and Objectives

Let's play with Flexbox and recap today's topic: Events and Iterators!

A boilerplate is provided to get you started, containing:

- `index.html` with all the HTML code you need
- `application.css` where you'll have to make use of Flexbox to finish styling the page
- `src/panels.js` where you'll eventually code your JavaScript solution

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

### Specs

The objective is to code a neat JavaScript effect for your page. To do that, you will need to use JavaScript iterators and DOM events, together with a little bit of CSS styling. You will also need to style the page using FlexBox and then add a nice JavaScript behavior to it so we can click on each panel to reveal the full image and the corresponding message.

Whenever we click on a panel it should expand and reveal the full text like this:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-reference.gif)

### Styling with FlexBox

We have a simple HTML structure with panels. Each panel has a background image and some text in it separated in 3 paragraph elements.

It looks quite strange at first, so our first step is making it prettier. How do we place the pictures side by side? [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox) is your friend in this styling part of the exercise. The page needs to look like this before moving onto the JavaScript part of the exercise:

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-styled.png"  width="600" height="300">

Tips:

- Think about why the images are all squished together. How can we make them grow to take up the entire width of the screen?
- Don't forget to make each individual panel a flex container as well to help style everything. (Consider adding `display: flex` to the panels).
- You might notice that the top and lower words of each panel should be out of view. We need to make sure that they aren't visible, but are still on the page so they can be moved into view. Maybe [Translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) could help?

### JavaScript problem breakdown

The JavaScript part of our problem should be clearer after you have properly styled the page.

We want to bring into view the hidden words whenever the corresponding panel is clicked. The panel should also grow when, revealing more of the image.

Remember to:

- Select the correct HTML elements
- Add event listeners to them (perfect place for Iteration) in the form of a click.
- Code what needs to happen when the event is trigerred. How about adding `.open` and `.closed` classes?
- The `flex-grow` attribute is proportional. An element that has `flex-grow: 2` will grow at twice the rate of an element that has `flex-grow: 1`.


