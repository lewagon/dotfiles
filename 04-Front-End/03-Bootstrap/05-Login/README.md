## Background & Objectives

Build a responsive login form using Bootstrap

- Start with this [simple login](http://lewagon.github.io/bootstrap-challenges/10-Login/).
- Then you will code this [more advanced one](http://lewagon.github.io/bootstrap-challenges/10-Login/login.html).

## Further suggestions & resources

### Grid offset technique

The trick to make a responsive form is to inject it in a Bootstrap grid:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 col-sm-offset-4">

      <form action="">
        ...
      </form>

    </div>
  </div>
</div>
```

- The form will be full-size on mobile
- On tablet and larger devices, it will be centered (thanks to the offset) and take 33% of the screen.

### Form design

If you want a more advanced design like [this one](http://lewagon.github.io/bootstrap-challenges/10-Login/login.html), you can improve the HTML structure of your form:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 col-sm-offset-4">

      <div class="form-login">
        <form action="">
          ...
        </form>
      </div>

    </div>
  </div>
</div>
```

And then implement your own `.form-login` CSS class in a `components/form.css` file.

### Reminder on forms

#### HTML forms

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

#### Bootstrap form classes

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
