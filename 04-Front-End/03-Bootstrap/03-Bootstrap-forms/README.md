## Background & Objectives

Build a [responsive signup form](https://lewagon.github.io/bootstrap-challenges/10-Login-form/).

**⚠️ Before starting, read all the instructions carefully.⚠️** Forms are among the most important components in a website, so you need to know how to design them!

## Grid offset technique

The best trick to make a form responsive is to inject it in a Bootstrap grid into a row that has the `justify-content-center` alignment class. **Remember** each `.row` is a flexbox, and we can use the same alignment tricks we used when working with flexbox to make our form responsive.

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-sm-4">
      <form action="">
        <!-- Your form content -->
      </form>
    </div>
  </div>
</div>
```

- The form will be full-size on mobile
- On tablet and larger devices, it will be centered (thanks to the `justify-content-center` alignment class) and will take 33% of the screen.
- You can make it even more responsive if you like (fullscreen on mobile, half-screen centered on tablet, 33%-screen centered on laptop etc.)

## HTML forms

An HTML `<form>` is made up of different `<input>` lines (i.e. each field of the form). Each input may have an associated `<label>` or not. The button to submit the form is also an input with the `type="submit"`. Here is what a form looks like:

```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```

1. There are different types of `<input>` (`type="text"`, `type="email"`, `type="date"`, etc).
2. The `placeholder` is a text example that disappears when the user starts writing.
3. The label `for="something"` will be linked to the input with `id="something"`. Linking labels and inputs is not just for fun. It allows us to click anywhere on that line to make the cursor jump into the associated input (rather than having to click inside the text box). This is much better UX!
4. The `value` attribute gives us the text that is displayed on the submit button.

Dropdown-lists are a bit different. **They have their own `<select>` tag and `<option>` tag for each option of the list**. Their HTML looks like this:


```html
<label for="favorite">What's your favorite language?</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
</select>
```

## Bootstrap form classes

Now let's speak about Bootstrap form classes:
- `.form-control` designs every `<input>` or `<select>`, except the submit button.
- `.form-text` allows you to add a hint underneath an `<input>` or `<select>`, such as a password length.
- `.mb-3` groups each `<input>` or `<select>` with its associated `<label>` to create some space at the bottom of each group.

Example of Bootstrap form **with labels**:

```html
<form action="#">
  <div class="mb-3">
    <label for="email" class="form-label">Your email</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Your password</label>
    <input type="password" id="password" class="form-control">
    <div id="password" class="form-text">Your password must be at least 6 characters long and contain letters and numbers.</div>
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Example of Bootstrap form **without labels**:

```html
<form action="#">
  <div class="mb-3">
    <input type="email" class="form-control">
  </div>
  <div class="mb-3">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Now if you want an [inline form](https://getbootstrap.com/docs/5.1/forms/layout/#inline-forms) you can **add the `.row` (which is a flexbox) and `.row-cols-*-auto` classes to the `<form>`** (the `.row-cols-*` class allows you to decide as of which breakpoint you want your input fields to be stacked next to each other. For example, `.row-cols-sm-auto` means that on mobile each input field takes up the full width and on a tablet or larger devices all input fields are next to each other):

```html
<form action="#" class="row row-cols-lg-auto">
  <div class="col-12">
    <input type="email" class="form-control">
  </div>
  <div class="col-12">
    <input type="password" class="form-control">
  </div>
  <div class="col-12">
    <input type="submit" value="Sign In" class="btn btn-primary">
  </div>
</form>
```

## Using the grid to build more complex forms

You can also add the `.row` class to your `<form>` and put different `col` dimensions inside. Here is an example to have 2 `input`s on the same row, while the third `input` takes up a full row:

```html
<form action="#" class="row">
  <div class="col-6 mb-3">
    <label for="first-name" class="form-label">First name</label>
    <input id="first-name" type="text" class="form-control" placeholder="First name">
  </div>
  <div class="col-6 mb-3">
    <label for="last-name" class="form-label">Last name</label>
    <input id="last-name" type="text" class="form-control" placeholder="Last name">
  </div>
  <div class="col-12 mb-3">
    <label for="address" class="form-label">Address</label>
    <input id="address" type="text" class="form-control" placeholder="Address">
  </div>
  <!-- rest of the form below -->
</form>
```

## Your turn

- Now it's your turn to build a [responsive signup form](http://lewagon.github.io/bootstrap-challenges/10-Login-form/).
- Try to customize your design a bit in `components/form.css`

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
