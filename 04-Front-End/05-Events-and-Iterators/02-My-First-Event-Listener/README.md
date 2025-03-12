## Background & Objectives

We've already covered how to select a DOM element using `querySelector`. Now we'll see how we can react to [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) to create interactive websites.

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

## Specs

Open the `index.html` file. You can see we are using Bootstrap. Also, there is a big button in the `<body>`.

Your goal is to implement some JavaScript in the `lib/listener.js` file. **Your code should react when the big blue button gets clicked.** When clicked, we want:

- The button to be disabled. This can be done by adding the `.disabled` class.
- The button text to change from "Click me!" to "Bingo!"
- Optional: the `sound.mp3` [to be played in the Browser](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

The sound might not work on some browsers running on **Ubuntu**. To fix it, just run:

```bash
sudo apt-get install ubuntu-restricted-extras 
```

There aren't any tests for this exercise, but we check your style! So run `rake` anyway. And remember to **refresh the page** to see your changes.
