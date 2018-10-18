## Background & Objectives

A quick challenge to warmup! Let's rehearse how to bind a DOM event to some action in JavaScript!

It's always the same 3-step process:

- **Select** the element you want to make interactive
- **Listen** to some event on the element
- Write the **callback** (the code that runs when the event occurs)

## Specs

Launch your local webserver with:

```bash
rake webpack
```

Open [`localhost:8080`](http://localhost:8080) in your browser.

You should see a big green button saying `Click me!`.

The goal of this challenge is to:

- select the big green button
- listen to the `click` event on the button
- display `Thank you!` in an [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) any time the button is clicked!

