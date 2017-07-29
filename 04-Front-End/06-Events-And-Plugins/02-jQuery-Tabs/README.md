## Background & Objectives

Build dynamic tabs like the ones on [this page](http://lewagon.github.io/animation-challenges/05-jQuery-tabs/). You will have to write your code in the `javascript/tabs.js` file.

## Good HTML => Good jQuery

Everything starts with a good HTML markup. If your HTML markup is poor, there's nothing you can do to make up for it in jQuery. Look at our HTML structure:

```html
<div class="tabs">
  <a class="tab active" data-target="#bio">
    <h3>Bio</h3>
  </a>
  <a class="tab" data-target="#projects">
    <h3>Projects</h3>
  </a>
  <a class="tab" data-target="#contact">
    <h3>Contact</h3>
  </a>
</div>

<!-- ... -->

<div class="container text-center">
  <div class="tab-content" id="bio">
    <p>This is my bio.</p>
  </div>
  <div class="tab-content hidden" id="projects">
    <p>Here are my projects.</p>
  </div>
  <div class="tab-content hidden" id="contact">
    <p>Contact me if you want.</p>
  </div>
</div>
```

What's the link between a tab and the associated tab-content?

## Further suggestions

In jQuery, you have a convenient `data()` method that you can use to get the value of all the `data-something` attributes in your HTML.

```html
<p class="example" data-temperature="24" data-message="hello">some example</p>
```

```javascript
$(document).ready(function () {
  $(".example").data("temperature"); // => "24"
  $(".example").data("message"); // => "hello"
});
```

Here you can use it to get the `data("target")` of each of the tabs.
