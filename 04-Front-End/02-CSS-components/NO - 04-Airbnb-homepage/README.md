## Background & Objectives

Build <a href="http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/" target="_blank">this Airbnb-like home page</a>.

⚠️⚠️⚠️ This is an advanced CSS challenge ⚠️⚠️⚠️ so **read all the instructions and tips carefully**.

## Re-use your previous components

First let's save time and re-use our simple components:

1. Create your avatar, button and banner CSS files (we have put empty files for that in the starting boilerplate). For button and banner files, just re-use your code from previous challenges.
2. Add the banner to your HTML
2. Now it's time for your card design (the hard part of this challenge) in `card.css`

## Draw all your `div` first 🎨🎨🎨

Drawing the structure of a component is the hardest part, but once you've done that, it becomes so much easier to nail the CSS! We've helped you a little here and given you the structure of the cards you need to reproduce in this challenge:

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-design.png" alt="">
</div>

Now that you have this structure, ask yourself:

- What CSS technique should I use to position elements in the corners for the `.card-body` section? Flexbox? Relative/absolute positioning?
- What CSS technique should I use for the `.card-footer`? Flexbox? Is it `space-between` or `space-around`?

Now you know the **div structure 📐 & CSS techniques 🚀** for a component, you just have to code it!


## Center content in a container

Notice that in [our objective](http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/), the cards do not take 100% of the screen width. They are inside a `container`:

```html
<div class="container">
  <div class="cards">
    ...
  </div>
</div>
```

We already defined the container class for you in `style.css`

```css
.container {
  max-width: 1000px;
  margin: 0 auto; /* 0px => top/bottom, automatic => left/right */
}
```

## Start with one card only

Before putting all 3 cards inside a "grid", start with one!

```html
<div class="container">
  <div class="cards">
    <div class="card">
      <!-- design one card first -->
    </div>
  </div>
</div>
```


## Build a flexbox grid of cards

We only have one card in our page.. A bit sad no? What if we had three cards next to each other? Let's build a simple flexbox grid. Here's the HTML:

```html
<div class="container">
  <div class="cards">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
  </div>
</div>
```

Now add the CSS code for your flexbox:

```css
.cards {
  display: flex;
}
.cards .card{
  flex: 1 1 auto;
}
```

Cool right 💥? Sadly, when resizing your browser you will discover that your flexbox grid is not very responsive 😬. Good news: tomorrow you will discover **Bootstrap responsive grids**. Be patient!

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
