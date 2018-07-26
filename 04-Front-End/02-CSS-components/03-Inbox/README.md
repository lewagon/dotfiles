## Background & Objectives

Build [a cool inbox](http://lewagon.github.io/html-css-challenges/13-inbox/).

1. Create your avatar CSS component.
2. Implement your tabs and your message design in `tabs.css` and `message.css`.

But first, **read all the instructions**!

## Tab design

Tabs are pretty easy to design. The HTML looks like this:

```html
<div class="tabs">
  <a href="#" class="tab active">Traveling</a>
  <a href="#" class="tab">Hosting</a>
</div>
```

Once that is done:

- Make `.tabs` a flexbox
- Add some `padding` on each `.tab`
- You don't even need `space-between` or `align-items` here because the tabs already have the same `height`
- You can also design the **active** and **hover** states of tabs using `.tab.active` & `.tab:hover`. You will probably need to play with the `opacity` and the `border-bottom` 😬

## Message design

For the `.message` design, **go back to the slides!** This is a classic use case for flexbox here, with the body of the message pushing the other items thanks to a `flex-grow`.

Once that is done, it's just a matter of fine-tuning your `margin`, `padding`, and playing with fonts and colors.

So what are you waiting for? Time to make a cool inbox! 🚀📥🚀

## [Extra tip] First & last child selectors

You can select first (or last message) with these selectors:

```css
.message:first-child {
  /* CSS code for the first element with class="message" */
}
.message:last-child {
  /* CSS code for the last element with class="message" */
}
```

It can be useful to get rid of `border-bottom` on the last message of the inbox for instance!

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
