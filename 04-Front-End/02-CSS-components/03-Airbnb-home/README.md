## Background & Objectives

Build Airbnb home page (at least a simple version of it), like [this page](http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/)


1. First re-use your avatar, button and banner CSS code (we put your empty files in the starting boilerplate).
2. Then implement your card design in `card.css`


## Tips & Resources

### Container

Notice that in [our objective](http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/), the card does not take 100% of the screen width. It is in a `container`

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
  margin: 0 auto;
}
```

### Relative > Absolute pattern

Don't forget to use the Relative > Absolute pattern to design your card. You will have also to put a background image with a gradient filter (as for the banner).


### Optional - Responsive container

You will see tomorrow in Bootstrap that their `container` class is a bit smarter than the one we use in this exercise. Bootstrap defines a `container` with different width depending on the screen width. We can do that with [media queries](https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries) in CSS. The code looks like:


```css
.container {
  margin: 0 auto;
}
@media (min-width: 1200px)
  .container {
    width: 1170px;
  }
}
@media (min-width: 992px)
  .container {
    width: 970px;
  }
}
@media (min-width: 768px)
  .container {
    width: 750px;
  }
}
```

Do you understand this code? It's not so complicated. Media query is just a way to define CSS code conditional to the screen size. That's how you write responsive CSS code.

In `style.css`, replace our stupid non-responsive container by this smarter one. Then look how the container changes when you resize your browser. Feel free to change media query breakpoints and container dimensions to play with the responsive behavior.


### Optional - Flexbox card grid

We have one card in the container.. A bit sad no? How about having three cards next to each other. Let's build a small grid using flexbox. Here's the HTML:

```html
<div class="container">
  <div class="cards">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
  </div>
</div>
```

Now the CSS code using flexbox is quite simple:

```css
.cards {
  display: flex;
  justify-content: space-between;
}
.cards .card{
  flex: 0 0 30%;
}
```

How cool? Sadly, when resizing your browser you will discover that this flexbox grid is not responsive. Good news: tomorrow you will discover **Bootstrap responsive grid!**.
