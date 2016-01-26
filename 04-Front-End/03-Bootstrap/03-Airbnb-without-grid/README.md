## Background & Objectives

A challenge to get familiar with Bootstrap basic classes:

- Text and list classes: `.text-center`, `.list-inline`...
- Button classes: `.btn`, `.btn-primary`, `.btn-success` `.btn-lg`...
- Form classes: `.form-inline`, `form-control`...

## Specs

In this challenge, reproduce [this page](http://lewagon.github.io/bootstrap-challenges/08-Final-airbnb-home-without-grid/) by using Bootstrap classes **as much as possible.**

- Every time you need to design a component, look first in the [Bootstrap documentation](http://getbootstrap.com/) to see if there is a class for that.
- For the banner and the footer you will have to write your own CSS. For the banner component, pick it in [Le Wagon library](http://lewagon.github.io/ui-components/#banner) and put the CSS code in `banner.css`.


Here are some tips to help you.

## Tips & Resources

### Icons & pictures

For the banner's background image we give you a `background.jpg` image in the images folder. Feel free to pick another one on [thestocks](http://thestocks.im/) or to use a placeholder from [unsplash.it](http://unsplash.it).

For the icons, we also give your 4 icons (`globe.png`, `dollar.png`, `heart.png`, `beer.png`) coming from [Nucleo Free Pack](https://nucleoapp.com/). Feel free to pick your own icons in the resources we gave you ([NounProject](http://thenounproject.com/), [Kameleon](http://www.kameleon.pics/) or [Streamline](http://www.streamlineicons.com/)). Don't spend too much time on it, lots of interesting challenges today!

### HTML forms

A HTML `<form>` is made of different `<input>` (i.e. the fields of the form). Each input may have an associated `<label>` or not. The button to submit the form is also an input with the `type="submit"`. Here is what a form looks like:


```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```


1. There are different types of input (`type="text"`, `type="email"`, `type="date"`, etc...)
2. The `placeholder` is an indicative text which disappears when the user starts writing.
3. The label `for="something"` will be linked to the input with `id="something"`. Linking labels and inputs is not just for fun. When you will click on the label, the cursor will jump into the associated input (thus a better UX).
4. The text of the submit button is given thanks to the `value` attribute.


### Bootstrap form classes

Now let's speak about Bootstrap form classes:

- `form-control` is here to design every `input` (except the button).
- `form-group` is here to group each input with its associated label.

Example of Bootstrap form with labels:

```html
<form action="#">
  <div class="form-group">
    <label>Your email</label>
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <label>Your password</label>
    <input type="password" class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Example of Bootstrap form without labels:

```html
<form action="#">
  <input type="email" class="form-control">
  <input type="password" class="form-control">
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Now if you want an horizontal form you can **add the `form-inline` class to the `<form>`** (same as `list-inline` for a list):

```html
<form action="#" class="form-inline">
  <input type="email" class="form-control">
  <input type="password" class="form-control">
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Bootstrap forms are a bit complicated for beginners.. **Don't rush and take time to understand them**. Forms are very important in a website, it's where the user interacts!
