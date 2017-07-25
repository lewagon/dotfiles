## Background & Objectives

Build a [responsive signup form](http://lewagon.github.io/bootstrap-challenges/10-Login/).

**⚠️ Before starting, read all the instructions carefully until the end.⚠️**. Forms are among the most important components in a website, so you should know how to design them!

## Grid offset technique

The trick to make a responsive form is to inject it in a Bootstrap grid with an offset:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 col-sm-offset-4">
      <form action="">
        <!-- Your form content -->
      </form>
    </div>
  </div>
</div>
```

- The form will be full-size on mobile
- On tablet and larger devices, it will be centered (thanks to the offset) and take 33% of the screen.
- You can even have a better responsive behavior (fullscreen on mobile, half-screen centered on tablet, 33%-screen centered on laptop)


## HTML forms

A HTML `<form>` is made of different `<input>` (i.e. the fields of the form). Each input may have an associated `<label>` or not. The button to submit the form is also an input with the `type="submit"`. Here is what a form looks like:

```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```

1. There are different types of `<input>` (`type="text"`, `type="email"`, `type="date"`, etc.)
2. The `placeholder` is an indicative text which disappears when the user starts writing.
3. The label `for="something"` will be linked to the input with `id="something"`. Linking labels and inputs is not just for fun. When you will click on the label, the cursor will jump into the associated input (thus a better UX).
4. The text of the submit button is given thanks to the `value` attribute.

Dropdown-lists are a bit different. **They have their own `<select>` tag and `<option>` tag for each option of the list**. Their HTML looks like this:


```html
<label for="favorite">What's your favorite language?</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">Javascript</option>
</select>
```


## Bootstrap form classes

Now let's speak about Bootstrap form classes:

- `.form-control` is here to design every `<input>` or `<select>`, except the submit button.
- `.form-group` is here to group each `<input>` or `<select>` with its associated `<label>`.

Example of Bootstrap form **with labels**:

```html
<form action="#">
  <div class="form-group">
    <label for="email">Your email</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Your password</label>
    <input type="password" id="password" class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Example of Bootstrap form **without labels**:

```html
<form action="#">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Now if you want an horizontal form you can **add the `.form-inline` class to the `<form>`** (same as the `.list-inline` class for a list `<ul>`):

```html
<form action="#" class="form-inline">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

## Injecting a `.row` in the form

You can also inject a row inside a form, here is an example with inputs for first name and last name:

```html
<form action="">
  <div class="row">
    <div class="col-xs-6">
      <div class="form-group">
        <label for="first-name">First name</label>
        <input type="text" class="form-control" id="first-name" placeholder="Bob">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="last-name">Last name</label>
        <input type="text" class="form-control" id="last-name" placeholder="Sponge">
      </div>
    </div>
  </div>
  <!-- Rest of the form -->
</form>
```

## Your turn

- Your turn to build a [responsive signup form](http://lewagon.github.io/bootstrap-challenges/10-Login/).
- You can try to customize a bit your form design in `components/form.css`

