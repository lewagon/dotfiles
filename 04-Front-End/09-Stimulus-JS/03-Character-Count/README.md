## Background & Objectives

Adding to your Stimulus component library, you'll now implement a component that counts the number of characters in an input.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-animation.gif)

Stimulus controllers are made to be re-usable. Think that you'll be able to re-use them later in many different features of your project. These controllers are often called `utilities`.

## Setup

Run the server from your terminal with:

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap.

This time, `Stimulus` is already setup in the `index.html` head.

However, you still need to get used to doing the JavaScript setup part yourself. Open `index.js` and import the Stimulus Controller on top and register the controller at the bottom. You can name the controller `CharacterCountController`.

Create a `character_count_controller.js` file in the empty `controllers` folder, copy-paste the boilerplate:

```javascript
// lib/controllers/character_count_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

We're good to go!

## Specs

Your goal is to implement a counter that counts the number of characters in the text area.

### 1. Imagine the concept

Now that you have a basic setup, think about the concept of the component. What is the purpose of this component? How will you code it? Take a piece of paper and draw your component. It could like like this:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-mockup.png)

Then, ask yourselves the following questions:
- Will I need to add Stimulus targets to the HTML? For example, a `counter` target that will display the number.
- Will I need to add Stimulus actions to the HTML?
- Will I need to add Stimulus values to the HTML?

When you have a rough idea of your component, you can start coding!

### 2. Prepare your HTML

Add a `<textarea>` tag in your `index.html`.

Then add a small `<div>` tag that will act as a counter and display the number of characters.

Add Bootstrap classes to make it look nice if needed.

### 3. Implement the Stimulus Controller

Make sure to attach your Stimulus Controller to the DOM.

We'll need to implement a `updateCounter()` method which will count and re-count the number of characters in the textarea everytime. But what event triggers the call of that method? When found, add the corresponding Stimulus `data-action` to the textarea.

In your Stimulus Controller, let's code the event callback now. As always, add a `console.log` in the method and check that it works every time the event is called.

Once this is done, think about the pseudocode.

### 4. Implement the `updateCounter()` method

When a user types a character in the textarea, we need to:
- Retrieve the number of characters in the textarea.
- Update the counter with the number of characters.

### Going further: Let's implement a character limit!

Now that you have a working counter, let's add a character limit. When the user types more than 140 characters, the counter should turn red and display: `Number of charater exceeded by X characters`.
