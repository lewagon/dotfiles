## Background & Objectives

A challenge to get familiar with Bootstrap basic classes:

- Text and list classes: `.text-center`, `.list-inline`...
- Button classes: `.btn`, `.btn-primary`, `.btn-success` `.btn-lg`...
- Form classes: `.form-inline`, `form-control`...

## Specs

In this challenge, reproduce [this page](http://lewagon.github.io/bootstrap-challenges/08-Final-airbnb-home-without-grid/) by using Bootstrap classes **as much as possible.**

- Every time you need to design a component, look first in the [Bootstrap documentation](http://getbootstrap.com/) to see if there is a class for that.
- For the banner and the footer you will have to write your own CSS. For the banner, you can [copy/paste code from Le Wagon library](http://lewagon.github.io/ui-components/#banner) to save time.


Here is a bit of help to design the newlsetter form.


### HTML basics for forms

A basic HTML `<form>` is made of different `<input>` (= the different fields of the form). Each input may or may not have a corresponding label. The button to submit the form is also an input with the `type="submit"`. Here is a basic form HTML code


```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```


- There are different types of input (`type="text"`, `type="email"`, `type="date"`)
- The `placeholder` is an indicative text which disappears when the user starts writing.
- The label `for="something"` is linked to the input with `id="something"`.
- The text of the submit button is given in the `value` attribute.


### Bootstrap form structure

- `form-control` class is here to design all the `input` (except button).
- `form-group` class is here to group each input with the associated label.

Examples:

```html
<form action="#">
  <div class="form-group">
    <label>Your email</label>
    <input type="email"class="form-control">
  </div>
  <div class="form-group">
    <label>Your password</label>
    <input type="password"class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Or without labels:

```html
<form action="#">
  <input type="email" class="form-control">
  <input type="password" class="form-control">
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Now if you want an horizontal form you can add the `form-inline` class to the `<form>`:

```html
<form action="#" class="form-inline">
  <input type="email" class="form-control">
  <input type="password" class="form-control">
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Bootstrap form markup is complicated for beginners.. **But don't rush and take your time to understand it**. Forms are very important in a website (it's where the user interacts), so **treat them well!**


## Tips & Resources

For the banner background image we put you a `background.jpg` image in the images folder. Feel free to pick another one on [thestocks](http://thestocks.im/) or to use a placeholder from [unsplash.it](http://unsplash.it).
