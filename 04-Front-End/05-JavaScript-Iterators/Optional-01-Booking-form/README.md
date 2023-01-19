## Background & Objectives

This is what you'll build in this challenge:

![Dynamic form Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/booking-form.gif)

We won't do AJAX in this challenge, we just want to **update the form's UI** when a user clicks on the `-` / `+` buttons.

Submitting the form is not expected to have any effects.

Time to play with [`dataset`s](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)!

## Specs

Launch your local webserver with:

```bash
rake webpack
```

Open [`localhost:8080`](http://localhost:8080) in your browser.

### Add participants

The page displays a booking form that we want to make **dynamic**. When the user clicks on the `+` / `-` buttons, we want to:

- Update the counter
- Update the price displayed on the submit button
- Update the value of the read-only input (in cents)

To do so, take a good look at the `index.html` file, especially **the `data-` attributes** that hold precious values to help you!

### Enable the minus (`-`)

The `-` button should not allow `0` or negative values! When you want to "disable" a link you can prevent it's default behavior like this:

```js
button.addEventListener('click', (event) => {
  event.preventDefault();  
});

```

Improve your form's UX by:

- Toggling `-` link: **enable** the link when the number of participants is **`>= 2`** and **disable** it otherwise (the counter should never reach `0` nor negative values)!
- Hiding the input (you may want to look into [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)), it should not be visible to your users in your form's final version!

This challenge is **hard**, discuss it with your buddy and do it step by step, with pseudo-code!

There aren't any tests for this exercise, but we check your style! So run `rake`.

## Resources

- To add / remove an HTML attribute to / from an element, you may want to look at [`removeAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute) and [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- You can get all the attributes of an HTML element by calling the [`.attributes` property](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) on the element
