## Background & Objectives

In this unit, we'll be spending some time coding useful components for your future projects. This is a first step towards building your own library of components. 

In this challenge, you'll be coding a Copy to Clipboard component. This component will be used to copy a text to the clipboard.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/stimulus-utilities/stimulus_utilities_clipboard_screenshot.png)

## Setup

Run the server from your terminal with:

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap. Also, there is a big button in the `<body>`. We'll come to that in a second.

This time, `Stimulus` is already setup in the `index.html` head. 

However, you still need to get used to doing the JavaScript setup part yourself. Open `index.js` and import the Stimulus Controller on top and register the controller at the bottom. You can name the controller `CopyToClipboardController`.

Create a `copy_to_clipboard_controller.js` file in the empty `controllers` folder, copy-paste the boilerplate:
```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

We're good to go!

## Specs

Your goal is to implement a button that copies the text in the value of the input to the clipboard.

Once you click on the *Copy to Clipboard* button, you can then use `ctrl + v` to paste the text in another text area.

### 1. Prepare your HTML

Add a `<input>` tag in your HTML with a `<button>`. 

You can then use some [Bootstrap classes](https://getbootstrap.com/docs/5.1/forms/input-group/) such as `.input-group` to style your input and button horizontally.

How can you add some text in your input? How about we use the `value` attribute? Once you have added a text to the value, make sure the input is in `readonly`. Basically, no one should be able to edit the text in the input.

### 2. Implement the Stimulus Controller

Make sure to attach your Stimulus Controller to the DOM with `data-controller`. 

In your Stimulus Controller, you'll need to implement the `copy()` method. This method will be called when the user clicks on the button (think `data-action`). As always, make sure the `copy()` method is called with the right context. Put a `console.log` in the method, click on the button and check that you see the message in the browser console.

Once this is done, think about the pseudocode for the `copy()` method. What do you need to do to copy the text in the input to the clipboard?

### 3. Implement the `copy()` method

You'll need to use the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard). Have a look at the documentation, which method of the API do you need to use?

What happens when we click on the button (have a look at the gif above):
- The text inside the input's value is copied to the clipboard (in more technical words, the text string is *written* to the system clipboard). To get the value of the input, how about implementing a data target `input` in your Stimulus Controller?
- When clicked, the button becomes `disabled`. It is no longer clickable. 
- The text inside the button changes to "Copied!". This text could be changed from one context to another if we were meant to re-use this Stimulus controller. Instead of hard-coding it in the JavaScript, let's create a Stimulus data `value` called `feedback-text` and use it in the Stimulus controller. The button, when, disabled will display whatever text is assigned to the `feedback-text` data value.
