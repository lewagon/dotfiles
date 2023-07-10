## Background & Objectives

Let's create a new Stimulus controller that will allow us to check all checkboxes at once.

## Setup

Run the server from your terminal with:

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap.

This time, `Stimulus` is already setup in the `index.html` head.

However, you still need to get used to doing the JavaScript setup part yourself. Open `index.js` and import the Stimulus Controller on top and register the controller at the bottom. You can name the controller `CheckAllCheckboxesController`.

Create a `check_all_checkboxes_controller.js` file in the empty `controllers` folder, copy-paste the boilerplate:
```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

We're good to go!

## Specs

Your goal is to implement a checkbox that will check all checkboxes at once.

### 1. Prepare your HTML

This time the HTML is already provided for you.

Now, let's tweak our HTML to **connect** the controller:
- On which DOM element are you going to connect the controller?
- What's the syntax to connect it?

We know the controller will have to interact with the checkbox "Check all", and also the 4 other category checkboxes. In Stimulus, a controller can interact only with elements within its scope - as in, only with children elements of the DOM element to which it's connected. So, the question here is: "Which element is wrapping both the 'Check All' checkbox and the category checkboxes?"

Once you're done connecting the controller, add a `console.log` in the `connect()` method. Go back to your browser, open the console, and reload the page. You should see your message in the console.

### 2. Listen to an event

We now want to check all checkboxes when we check the "Check all" one. It means, we want to listen to the event happening on the "Check all" checkbox, and then trigger some code logic for the other checkboxes.

In Stimulus, listening to an event is called an **Action**. But which event are we listening to?

According to this [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), a checkbox emits 2 kind of events: `change` and `click`. Let's use `change` (as in "change" of state).

When the event `change` is emitted, we will call the method `checkAll()` on the 'check-all-checkboxes' controller.

Let's implement this Stimulus action in our HTML.

### 3. Implement the event callback

Now that we're listening to the `change` checkbox event, let's code the `checkAll` method in our Stimulus controller.

Notice this method takes an `event` parameter. By default the Stimulus actions call the method with an `event` object passed as argument - like the [good old `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

In this method, you will have to:
- Check the status of the "Check All" checkbox clicked.
- If it's checked, then, let's check all the other checkboxes
- If it isn't checked, then, let's uncheck all the other checkboxes

But how do you access all the other checkboxes in this method? Good question!

### 4. Think about targets

First, we have to list the targets in the controller. Which element of the DOM should be targeted as a 'checkbox'? Let's keep in mind that it'll be useful for us to select all of them and then iterate on each of them to make it marked as a checked.

_Hint: Remember how in vanilla JavaScript you can either use `querySelector` or `querySelectorAll`, depending on whether you want to get only one element or an array of all matching elements back? There's a similar idea in Stimulus! If you say `this.cardTarget`, you will get back only one element with `data-my-controller-target="card"`. If you say `this.cardTargets` with an "s" in it, then you will get back an array of all the elements that have  `data-my-controller-target="card"` on them, whether there are 0 or 50 of them. [(source)](https://stimulus.hotwired.dev/reference/targets#properties)_

Once you have spotted your target, let's add the target in the HTML.

### 5. Implementing the logic

After implementing the targets, let's go back to our `#checkAll` method.

Here is what we have to do:
- Check the status of the "Check All" checkbox clicked.
- If it's checked, then, let's iterate over all the checkbox targets, and change their `checked` property to `true`
- If it isn't checked, then, let's iterate over all the checkbox targets, and change their `checked` property to `false`

You've got everything in hand to tackle the rest of this challenge.

Remember to try the behaviour of your Stimulus controller in the Browser (test manually), and feel free to add `console.log` to understand what you're dealing with in the `checkAll` methods

Your turn!

### Going further: Understand lifecycles

Notice the `connect()` method. Stimulus controllers come with lifecyle callbacks:
- `initialize()` (different from ES6 constructor)
- `connect()`
- `disconnect()`

`connect()` is triggered when the controller is connected to a DOM element, with the `data-controller` attribute.

If you want to read more about Stimulus controller lifecycles, [read this documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)
