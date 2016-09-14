## Background & Objectives

Replace your banner button by a nice search form like in [this page](http://lewagon.github.io/bootstrap-challenges/11-Airbnb-search-form/)

## Further suggestions & resources

The select input **is not** a basic `<input>` element, it is written like this:

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
- Use `<input type="text">` for checkin/checkout. Even if there is a `<input type="date">`, let's keep text inputs anyway. Next week, we will add a jQuery datepicker on these text inputs.
- Don't forget to add `placeholder`.
- You can use the `input-lg` and `btn-lg` additional classes if you want your inputs and button to be larger.
