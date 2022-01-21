## Background & Objectives

JavaScript is really useful when it comes to validating forms on the client side.
When people are filling out your form, it's best to give them feedback as quickly as possible if a field has been incorrectly completed.

## Specs

As usual, you can start Webpack and go to [localhost:8080](http://localhost:8080).

```bash
rake webpack
```

We want to validate the form as the user fills each input. The [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) might be what you are looking for...

- All fields are required
- Ensure the Terms of Service checkbox is ticked
- Ensure the user enters a valid **French zipcode**
- Validate the email format
- Validate the phone number. **French mobile phones only**
- If all fields have been completed correctly, enable the submit button

Open the `lib/validation.js` file. This is where you'll code the validation logic.

## Further suggestions

To display that an input is valid or invalid you can use the `.is-valid` & `.is-invalid` on your `input` from [Bootstrap server side validation classes](https://getbootstrap.com/docs/5.1/forms/validation/#server-side) like this:

```html
<input type="text" class="form-control is-valid">
<input type="text" class="form-control is-invalid">
```
