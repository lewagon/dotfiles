## Background & Objectives

In this exercise, we will use the [Stimulus](https://stimulus.hotwired.dev/) JavaScript framework. This framework has been created by [Basecamp](https://basecamp.com/), the same company behind the Ruby on Rails framework.

The tagline of this framework is to be the "modest framework for the HTML you already have". It's a framework that you will be able to use during your projects to help you organize your JavaScript code. It plays well with Rails as it will allow you to dynamically generate HTML on the server side (remember MVC, Sinatra, etc.) and plug in some JS behavior.

The big upside of Stimulus is that you will never have to do write `querySelector` or `addEventListener` anymore! Instead you will use conventional `data-` HTML attributes on specific element.

This framework uses [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), a neat addition since 2015 (ES6 release year) to add Object Oriented Programming to JavaScript.

## Boilerplate

Go ahead, open your `index.html` and look at the code inside.

It's an HTML form with category checkboxes:
- 1x checkbox "Check All"
- 4x checkbox with Categories

You can launch the webpack server:

```bash
yarn install
rake webpack
```

and open [localhost:8080](http://localhost:8080) in your browser.

You can check these checkboxes individually, but the "Check all" checkbox is not yet checking all the checkboxes. This is the behaviour you want to implement thanks to JavaScript, and your new friend: Stimulus.

## Stimulus installation

First, let's add the Stimulus package to your project:

```bash
yarn add @hotwired/stimulus
yarn add @hotwired/stimulus-webpack-helpers
```

Then open the `lib/index.js` and add the following lines at the beginning of the file:

```js
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
```

These instructions are coming from [Stimulus installation guide](https://stimulus.hotwired.dev/handbook/installing#using-webpack-helpers) and are necessary to **load** Stimulus in your app.

## Your first Stimulus controller

First, let's create the controllers folder, where you will add your code:

```bash
mkdir lib/controllers
```

Now, let's create your first Stimulus controller file:

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!")
  }
}
```

Notice the `connect()` method. This method is triggered when the controller is **connected** to the document, ie when the HTML element with the `data-controller` attribute is present in the DOM.

The `connect()` method is what we call a **lifecycle callback**. If you want to read more about Stimulus lifecycles callbacks, [read this documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks).

## Bind the controller to the HTML

Now, let's tweak your HTML to **connect** the controller:
- On which DOM element are you going to connect the controller?
- What's the syntax to connect it?

Important: we know the controller will have to interact with the checkbox "Check all", and also the 4 other category checkboxes. In Stimulus, a controller can interact only with elements within its scope - as in, only with children elements of the DOM element to which it's connected. So, the question here is: "Which element is wrapping both the 'Check All' checkbox and the category checkboxes?"

<details>
  <summary markdown="span">Hint</summary>
  
  ```html
  <form data-controller="check-all-checkboxes">
    <!-- ... -->
  </form>
  ```
</details>

Once you're done connecting the controller, go back to your browser, open the console, and reload the page.

You should see the message `The 'check-all-checkboxes' controller is now loaded!` in the console 🎉

## Listen to an event

We now want to check all checkboxes when we check the "Check all" one. It means, we want to listen to event happening on the "Check all" checkbox, and then trigger some code logic for the other checkboxes.

If we read the Stimulus documentation, we can see [here the syntax](https://stimulus.hotwire.dev/reference/actions) to listen to an event. In Stimulus, it's called an **Action**.

But which event are we listening to?

According to this [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), a checkbox emits 2 kind of events: `change` and `click`.

Let's use `change` (as in "change" of state):

```html
<input id="check-all" type="checkbox" class="form-check-input" data-action="change->check-all-checkboxes#checkAll">
```

Here, we are clearly saying: "When the event 'change' is emitted, call the method 'checkAll' in the 'check-all-checkboxes' controller".

## Event callback

Now that we're listening to the "change" event, let's code the `checkAll` method:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  checkAll(event) {
    console.log(event)
  }
}
```

Notice this method takes an `event` parameter. By default the Stimulus actions call the method with an `event` object passed as argument, like the [good old `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

In your web browser, open the console and tick or untick the "Check all" checkbox: you should see the event printed out 🎉

Now, in this `checkAll` method, you will have to:
- Check the status of the "Check All" checkbox.
- If it's checked, let's check all the other checkboxes.
- If it isn't checked, let's uncheck all the other checkboxes.

But how do you access all the other checkboxes in this method? With Targets!

## Targets

In Stimulus, in addition to actions, which replace `addEventListener`, you can use **targets** to replace all your `querySelector` and `getElementById`.

If we read the Stimulus documentation, we can see [here the syntax](https://stimulus.hotwire.dev/reference/targets) to add targets.

First, we have to list the targets in the controller. In our case, we have only one kind of target: checkboxes.

So let's just add `static targets = ["checkbox"]` at the top of your controller:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    console.log(event)
  }
}
```

Then, you have to specify in the HTML which element of the DOM should be targeted as a 'checkbox'.

The syntax to do this is using, guess what... `data-attributes`! More precisely: `data-CONTROLLER_NAME-target="TARGET_NAME"`.

Therefore, let's add `data-check-all-checkboxes-target="checkbox"` to all the `<input type="checkbox" ...>` element (except the "Check All" one).

Once this is done, the Stimulus controller can easily fetch the targets with some simple syntax:

```javascript
this.checkboxTarget // -> return the first checkbox target, like querySelector
this.checkboxTargets // -> return all the checkbox targets, like querySelectorAll
```

## Implementing the logic

After defining the targets, let's go back to our `#checkAll` method.

Here is what we have to do:
- Check the status of the "Check All" checkbox.
- If it's checked, let's iterate over all the checkbox targets, and change their `checked` property to `true`.
- If it isn't checked, let's iterate over all the checkbox targets, and change their `checked` property to `false`.

You've got everything in hand to tackle the rest of this challenge.

Remember to try the behavior of your Stimulus controller in your web browser (test manually) and feel free to add `console.log` to understand what you're dealing with in the `checkAll` method.

Your turn!

## Key learning points

Have a last look at your `lib/controllers/check_all_checkboxes_controller.js` file.

- Do you see a `querySelector`? No, this is replaced by the **target** mechanism which automatically binds `this.$$$Target` variables to `data-controller-name-target` defined elements
- Do you see an `addEventListener`? No, this is replaced by the `data-action` with the syntax `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. You just have to implement the CALLBACK in your controller and that's it!

Once a Stimulus controller is implemented, it's very easy to re-use it everywhere on a website with the right HTML tags.

**From now on, we will always code our JavaScript inside Stimulus controllers**

## Going Further

If you want to learn more about Stimulus, we recommend you to read the followings:

- [The Origin of Stimulus](https://stimulus.hotwired.dev/handbook/origin)
- How to pass data from your HTML to your Stimulus controller using [Values](https://stimulus.hotwired.dev/reference/values)
- How to pass CSS classes from your HTML to your Stimulus controller using [CSS Classes](https://stimulus.hotwired.dev/reference/css-classes)
