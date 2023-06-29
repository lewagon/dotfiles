## Background & Objectives

A quick challenge to warmup! Let's rehearse how to bind a DOM event to some action in JavaScript!

It's always the same 3-step process:

- **Select** the element you want to make interactive
- **Listen** to some event on the element
- Write the **callback** (the code that runs when the event occurs)

## Specs

As usual, open the html page in your browser on `localhost:8000` with:

```bash
serve
```

You should see a big green button saying `Click me!`. The goal of this challenge is to display an [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) saying `Thank you!` when you click on it.

Open the `lib/index.js` and follow the pseudo-code!

There aren't any tests for this exercise, but we check your style! So run `rake`.
