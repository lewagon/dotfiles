## Background & Objectives

In front-end web development, **data attributes** are a pretty handy way to inject and store values in your HTML that you can easily access in your JavaScript.

Remember that you have already worked with attributes, such as **id**, **class**, **href**, **style**, etc. Theses are standard attributes which are used for a specific purpose. But sometimes we need to store other kinds of data in the HTML and create our own attributes to do so. This is where the **data attributes** come in.

In this challenge you will learn how to interact with these data attributes via JavaScript.

## Setup

Start by running a server and go to [localhost:8000](http://localhost:8000).

```bash
serve
```

## What We're Building

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/scratchcards.gif"  width="800" height="552">

Let's get ready to gamble 🎲

Your task is to sell lottery scratchcards. If you open your [localhost:8000](http://localhost:8000), you should see a grid of scratchcards. But these scratchcards are blank!

Each scratchcard costs 10€ to buy. But, the user doesn't know how much they'll win from each scratchcard. It could be nothing, or it could be thousands of euro. They have to "scratch" the scratchcard off to see what they've won after they buy it. That's why the actual amount isn't shown on the screen 😶‍🌫️

## Buying a Scratchcard

First, we want to build a behavior where the user can buy a scratchcard for 10€. The user will do so by clicking on one of these scratchcards. So, let's think through the steps for this:

1. Select all the scratchcards off the page (using either `querySelector` or `querySelectorAll`).
2. Listen for when the user clicks on one of these scratchcards.
3. When they do, subtract `10` from the amount of money they have. Don't worry about calculating how much they've won yet (that's the next section).
4. Display their balance on the page.

You'll notice in our HTML there's:

```html
<div id="footer" class="footer">
  Your balance is: <span id="balance">100</span>€
</div>
```

So, you'll want to display the amount of money the user has here. The user starts off with 100€ (as written in the HTML). Of course, their balance can't go below `0`; it's "game over" at that point 👾

You'll be able to tell that this works if, in your browser, the balance goes down by 10€ every time you click on a scratchcard until it reaches 0€.

## Calculating the Amount Won

It wouldn't be gambling if the user knew how much they'd win for each scratchcard! So, where is this information hidden?

If you take a look at the HTML, you'll notice that each scratchard looks like this:

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

The key detail is the `data-amount="5"`. This card would win us 5€ 🎉

So, how can we access this data attribute from JavaScript? **You'll want to use the [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) to do this**. The dataset is a JavaScript property that lets us access data attributes from HTML elements. Here's an example of the syntax:

```js
// if we have in our HTML: <div id="hotel" data-name="Azure Ocean"></div>

const hotel = document.querySelector("hotel");
console.log(hotel.dataset.name);
// will print out Azure Ocean
```

What does the `hotel.dataset.name` syntax remind you of? Yes, the `dataset` is an `Object` (like a `Hash` in Ruby) that has keys of the `data-` properties from the HTML! So, if we have `data-name="Azure Ocean"`, then `dataset.name` will give us `"Azure Ocean"`.

Back to our scratchcards, let's apply this principle to add the amount you won to the total:

1. Find the place in your code where you're subtracting `10`. You'll want to continue subtracting `10` (it's how much all scratchcards cost), but you'll want to modify this code to also _add_ the amount won.
2. Take the scratchcard element that you got off the DOM and use the `dataset` to get the `data-amount`. _Note: `dataset` properties are always strings, so you may need to convert if you want another type._
3. Add this amount to the user's balance.

You'll know you've succeeded if, when you click on the cards, sometimes the program adds to the user's balance instead of always subtracting 10€.

## Scratching the Cards

The only problem is that, right now, you can click the same scratchcard more than one time! This means that if the user finds a winning scractcard, they can keep clicking forever.

If you take a look back at the HTML, you'll notice:

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

There's also a `data-scratched="false"` property on there that we haven't used yet. You can have as many data attributes on one HTML element as you want (as long as they have different names), so it's no issue to use both `data-amount` and `data-scratched` here.

Here are your tasks:

1. When the user clicks on a scratchard, can you set its `data-scratched` attribute so that `data-scratched="true"`? _Hint: If you do this correctly, the CSS is already set up so that you'll notice the card will turn lighter when you click on it._
2. If the user tries to click on the same card more than one time, can you make it so that it doesn't let them buy it again?

## Showing the Amount Won on the Card

Finally, as an additional improvement to our application, can you make it so that, when you click on a card, that card shows the amount that the user won from that card?
