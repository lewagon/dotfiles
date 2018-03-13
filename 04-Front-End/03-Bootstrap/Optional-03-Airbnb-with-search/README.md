## Background & Objectives

Replace your banner button with a nice search form like [this one](http://lewagon.github.io/bootstrap-challenges/11-Airbnb-search-form/)

## Further suggestions & resources

The select input is **not** a basic `<input>` element. It is written like this:

```html
<select class="form-control">
  <option value="1">1 guest</option>
  <option value="2">2 guests</option>
  <option value="3">3 guests</option>
</select>
```

Here are some reminders to build your search form:

- Don't forget the `form-inline` class on `<form>`.
- Don't forget the `form-control` class on **every input**.
- Use `<input type="text">` for checkin/checkout. Even if there is an `<input type="date">`, let's keep text inputs for now. Next week, we will add a fancy jQuery datepicker to do this kind of thing properly.
- Don't forget to add `placeholders`.
- You can use the `input-lg` and `btn-lg` additional classes if you want your inputs/buttons to be larger.
