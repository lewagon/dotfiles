## Background & Objectives

Build <a href="http://lewagon.github.io/html-css-challenges/10-homepage-with-cards/" target="_blank">this Airbnb-like home page</a>.

⚠️⚠️⚠️ This is an advanced CSS challenge ⚠️⚠️⚠️ so **read all the instructions and tips carefully**.

## Re-use your previous components

First let's save time and implement or re-use simple components:

1. Write quickly your avatar, button and banner CSS files (we put empty files for that in the starting boilerplate). For button and banner, you can re-use your code from previous challenges.
2. Add the banner in the HTML
2. Then you will have to implement your card design (the hard part of this challenge) in `card.css`

## Draw the `div` first 🎨🎨🎨

Drawing the structure of a component is the hardest part, but once you've done that, you will just nail the CSS! You have to get used to **guessing the invisible `div` 😉**. We help you here and give you the structure of the cards you need to reproduce in this challenge:

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-design.png" alt="">
</div>

Now that you have this structure in mind, ask yourself:

- What CSS technique should I use to position elements in the corners for the `.card-body` section? Flexbox? Relative/absolute positionning?
- What CSS technique should I use for the `.card-footer`? Flexbox? Is it `space-between` for spacing the items or `space-around`?

When you know the **div structure 📐 + CSS techniques 🚀** for a component then you just have to code it!


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

Before putting the 3 cards inside a "grid", try to design just one card!

```html
<div class="container">
  <div class="cards">
    <div class="car">
      <!-- design one card first -->
    </div>
  </div>
</div>
```


## Build a flexbox grid of cards

We have one card in our page.. A bit sad no? What about having three cards next to each other? Let's build a simple flexbox grid for that. Here's the HTML:

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
}
.cards .card{
  flex: 1 1 auto;
}
```

How cool? Sadly, when resizing your browser you will discover that this flexbox grid is not very responsive 😬. Good news: tomorrow you will discover **Bootstrap responsive grid**. Be patient!
