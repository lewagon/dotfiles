## Background & Objectives

Build [a cool inbox](http://lewagon.github.io/html-css-challenges/13-inbox/).

1. Write quickly your avatar CSS component.
2. Then implement your tabs and your message design in `tabs.css` and `message.css`.

But first, **read all the instructions**.

## Tabs design

Tabs are pretty easy to design, the HTML looks like this:

```html
<div class="tabs">
  <a href="#" class="tab active">Traveling</a>
  <a href="#" class="tab">Hosting</a>
</div>
```

And then:

- You have to make `.tabs` a flexbox
- Put some `padding` on each `.tab`
- You don't even need `space-between` or `align-items` in such case because the tabs already have the same `height`.
- You can only design the active state of the tab (`.tab.active`) as well as the (`.tab:hover`) state. You will probably have to play on the `opacity` and the `border-bottom` 😬.

## Message design

For the `.message` design, **go back to Karr slides!** This is a classic use case of flexbox here, with the body of the message pushing the other items thanks to a `flex-grow`.

Then, it's just a matter of fine-tuning with `margin`, `padding`, and playing on fonts and colors.

Let's build a cool inbox buddies 🚀🚀🚀
