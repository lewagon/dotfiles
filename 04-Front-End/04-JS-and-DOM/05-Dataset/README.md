## Background & Objectives

In front-end web development, **data attributes** are a pretty handy way to inject and store values in your HTML that you can easily access in your JavaScript.

Remember the attributes you have already seen, such as **id**, **class**, **scr**, **style**. Theses are standard attributes which are used for a specific purpose. But sometimes we need to store other kinds of data in the HTML and we can do by creating a data attribute which we give our own name.

In this challenge you will learn how you can create your own data attribute and select it from the DOM with an API so that you can use it in your JavaScript code.


## Setup

Start by running a server and go togo to [localhost:8000](http://localhost:8000).

```bash
serve
```

You can see a burger card with a category, a title and a price. Imagine you have a special deal on this burger for one evening. You don't really want to change the price in the database because then you'd have to change it back again the next day.

Instead we can add a **data attribute** on this burger with the temporary price and replace the actual one with it using JavaScript.


### Adding a data attribute

Data attributes look exactly like "normal" attributes, except that they have the prefix `data-`. After the `data-` you can choose your own name for the attribute, ideally it should be something which reflects the data you want to inject.

For example, if you put an `id` to your `.card` class you would say

```html
<div class="card" id="burger">
```

If you want to inject the id of a record which is stored in your database you can do that with a data attribute like this

```html
<div class="card" data-id="42">
```

This can be useful when you combine dynamic behaviour with the information coming from your database, such has creating tabs for your dynamic data (you'll see more of this when you start working with Rails).


### Selecting the data attribute

Now that we know how to add a `data-attribute` to our HTML let's see how we can access it from the DOM!

**With `.getAttribute()`**

Just like any other attribute you can get it by using the method `getAttribute(attributeName)` and call it on the element you put the attribute on.

To go back to our example

```html
<div class="card" data-id="burger">
```

We can get the `id` by saying

```javascript
const burger = document.querySelector(".card");
burger.getAttribute("data-id");
```

**With `.dataset`**

Specifically for datas attribute we can also use the [dataset API]("https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset").

For this we simply call `dataset` and then the name of our attribute on the element and we get the same result.

```javascript
const burger = document.querySelector(".card");
burger.dataset.id;
```


## Specs

Add a data `price` attribute to the `.card` class element in your HTML and give it the value of `13`. Then go to the `lib/dataset.js` file and select this data attribute using the dataset API.

Lastly, use JavaScript code to replace the current price of 15€ with the new price of 13€.


There is no `rake` for this challenge but you know you have completed if when the price of your burger show 13€!
