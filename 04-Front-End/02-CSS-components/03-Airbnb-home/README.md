## Background & Objectives

Build Airbnb home page (at least a simple version of it), like [this page](http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/)


1. First **re-use** your avatar, button and banner CSS code (we put empty files for that in the starting boilerplate).
2. Then implement your card design in `card.css`


## Tips & Resources

### Container

Notice that in [our objective](http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/), the card (below the banner) does not take 100% of the screen width. It is in a `container`:

```html
<div class="container">
  <div class="card">
    ...
  </div>
</div>
```

We already defined the container class for you in `style.css`

```css
.container {
  max-width: 700px;
  margin: 0 auto; /* 0px margin on top/bottom, automatic margin on left/right
}
```

### Relative > Absolute pattern

Don't forget to use the **Relative > Absolute pattern** to design your card (as in Karr lecture). You will have also to put a background image on the card with a gradient filter (same technique as for the banner).


### [Optional] Responsive container

Tomorrow, you'll see that Bootstrap defines its own `container` class, which is a bit smarter than the one used in this exercise. Bootstrap `container` has different width depending on the screen size. We can do that with [media queries](https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries) in CSS. The code looks like:


```css
.container {
  margin: 0 auto;
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
```

Do you understand this code? It's not so complicated. Media queries are just a way "to condition" CSS code depending on screen size. This is how you write responsive design.

In `style.css`, replace our stupid non-responsive container by this smarter one. Then look how the container changes when you resize your browser. Feel free to change media query breakpoints and container dimensions to play with the responsive behavior.


### [Optional] Flexbox card grid

We have one card in our container.. A bit sad no? What about having three cards next to each other? Let's build a simple flexbox grid for that. Here's the HTML:

```html
<div class="container">
  <div class="cards">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
  </div>
</div>
```

Now the CSS code using flexbox:

```css
.cards {
  display: flex;
  justify-content: space-between;
}
.cards .card{
  flex: 0 0 30%;
}
```

How cool? Sadly, when resizing your browser you will discover that this flexbox grid is not responsive. Good news: tomorrow you will discover **Bootstrap responsive grid**. Be patient!
