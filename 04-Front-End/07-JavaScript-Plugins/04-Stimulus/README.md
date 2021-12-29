## Background & Objectives

In this exercise, we will use the [Stimulus](https://stimulusjs.org/) JavaScript framework. This framework has been created by [Basecamp](https://basecamp.com/), the same company behind the Ruby on Rails framework.

The tagline of this framework is to be the "modest framework for the HTML you already have". It's a framework that you will be able to use during your projects to help you organize your JavaScript code. It plays well with rails as it will allow you to dynamically generate HTML on the server side (remember MVC, Sinatra, etc.) and plug in some JS behavior.

The big upside of Stimulus is that if you use it, you will almost never have to do a manual `querySelector` or `addEventListener` anymore! Instead you will use conventional `data-` HTML attributes on specific element.

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

You can check these checkboxes individually, but the "Check all" checkbox is not yet checking all the checkboxes. This is the behaviour we want to implement thanks to JavaScript, and our new friend: Stimulus.


## Getting Started: Stimulus installation

Before we jump to the code, please take some time to read the following pages of the Handbook to grasp the philosophy behind the birth of this framework:

- [The Origin of Stimulus](https://stimulusjs.org/handbook/origin)
- [Introduction](https://stimulusjs.org/handbook/introduction)
- [Hello Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [Building Something Real](https://stimulusjs.org/handbook/building-something-real)

When you are done with these, let's [set up](https://stimulusjs.org/handbook/installing) our project with Stimulus:

```bash
yarn add stimulus
mkdir lib/controllers # This is where we will add our Stimulus code
```

Then open the `lib/index.js` and add the following at the beginning of the file:

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
```

These lines are necessary to **load** stimulus in your app.

Let's now implement our **first Stimulus controller**!

## Our first Stimulus controller

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!");
  }
}
```

Notice the `connect()` method. Stimulus controllers come with lifecyle callbacks:
- `initialize()` (different from ES6 constructor)
- `connect()`
- `disconnect()`

`connect()` is triggered when the controller is connected to a DOM element, with the `data-controller` attribute.

If you want to read more about Stimulus controller lifecycles, [read this documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)

Now, let's tweak our HTML to **connect** the controller:
- On which DOM element are you going to connect the controller?
- What's the syntax to connect it?

Important: we know the controller will have to interact with the checkbox "Check all", and also the 4 other category checkboxes. In Stimulus, a controller can interact only with elements within its scope - as in, only with children elements of the DOM element to which it's connected. So, the question here is: "Which element is wrapping both the 'Check All' checkbox and the category checkboxes?"

<details>
  <summary markdown='span'>Hint</summary>  
  
  ```html
  <form data-controller='check-all-checkboxes'>
    <!-- ... -->
  </form>
  ```
</details>

Once you're done connecting the controller, go back to your browser, open the console, and reload the page.
You should see the message `The 'check-all-checkboxes' controller is now loaded!` in the console.

## Listen to an event

We now want to check all checkboxes when we check the "Check all" one.
It means, we want to listen to event happening on the "Check all" checkbox, and then trigger some code logic for the other checkboxes.

If we read the Stimulus documentation, we can see [here the syntax](https://stimulus.hotwire.dev/reference/actions) to listen to an event. In Stimulus, it's called an **Action**.

But which event are we listening to?

According to this [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), a checkbox emits 2 kind of events: `change` and `click`.
Let's use `change` (as in "change" of state).

```html
<input id='check-all' type="checkbox" class="form-check-input" data-action='change->check-all-checkboxes#checkAll'>
```

Here, we are clearly saying: "When the event 'change' is emitted, call the method 'checkAll' on the 'check-all-checkboxes' controller".

## Event callback

Now that we're listening to the 'change' checkbox event, let's code the `checkAll` method.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  checkAll(event) {
    // Your code here
  }
}
```

Notice this method takes an `event` parameter. By default the Stimulus actions call the method with an `event` object passed as argument (like the [good old `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

In this method, you will have to:
- Check the status of the "Check All" checkbox clicked.
- If it's checked, then, let's check all the other checkboxes
- If it isn't checked, then, let's uncheck all the other checkboxes

But how do you access all the other checkboxes in this method? Good question!

## Targets

In addition to actions (which replace `addEventListener` in the context of a Stimulus controller), Stimulus introduces `targets` (which replace all your `querySelector` or `getElementById` in the context of a Stimulus controller).

To add targets, let's have a look at the [Stimulus documentation](https://stimulus.hotwire.dev/reference/targets).

First, we have to list the targets in the controller. In our case, we have only one kind of target: checkboxes.
So let's just add `static targets = ["checkbox"]`.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    // Your code here
  }
}
```

Then, we have to specify in the HTML, which element of the DOM should be targeted as a 'checkbox'.

The syntax to do this is using, guess what... `data-attributes`! More precisely: `data-CONTROLLER_NAME-target="TARGET_NAME"`.

Therefore, let's add `data-check-all-checkboxes-target='checkbox'` to all the `<input type="checkbox" ...>` element (except the "Check All" one).

Once this is done, the Stimulus controller can easily fetch the targets with some simple Stimulus syntax:

```js
this.checkboxTarget // -> return the first checkbox target
this.checkboxTargets // -> return a collection (think Array) of all the checkbox targets
```

## Implementing the logic

After implementing the targets, let's go back to our `#checkAll` method.

Here is what we have to do:
- Check the status of the "Check All" checkbox clicked.
- If it's checked, then, let's iterate over all the checkbox targets, and change their `checked` property to `true`
- If it isn't checked, then, let's iterate over all the checkbox targets, and change their `checked` property to `false`

You've got everything in hand to tackle the rest of this challenge.

Remember to try the behaviour of your Stimulus controller in the Browser (test manually), and feel free to add `console.log` to understand what you're dealing with in the `checkAll` methods

Your turn!

## Conclusion

Have a last look at your `lib/controllers/check_all_checkboxes_controller.js` file.

- Do you see a `querySelector`? No, this is replaced by the **target** mechanism which automatically binds `this.$$$Target` variables to `data-controller-name-target` defined elements
- Do you see an `addEventListener`? No, this is replaced by the `data-action` with the syntax `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. You just have to implement the CALLBACK in your controller and that's it!

Once a Stimulus controller is implemented, it's very easy to re-use it everywhere on a website with the right HTML tags.
