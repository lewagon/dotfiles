## Background & Objectives

Yesterday, we covered how to select a DOM element, read information on it and update it (text, CSS, etc.). Today, we'll see how we can react to [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) to create interactive websites.

## Specs

Launch your local webserver with:

```bash
rake webpack
```

Open the `index.html` file. You can se we are using Bootstrap. Also, there is a big button in the `<body />`.

Your goal is to implement some JavaScript in the `lib/listener.js` file. You should react to the click on this blue button. When clicked, we would like that:

1. The button gets disabled. This can be done by adding the `.disabled` class.
1. The button texts changes from "Click me!" to "Bingo!"
1. Optional: the `sound.mp3` [plays in the Browser](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

There aren't any tests for this exercise, but we check your style! So run `rake`.
