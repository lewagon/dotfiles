## Background & Objectives

Javascript is really useful when it comes to validating forms on the client side.
When people are filling your form, it's best to give them feedback as quickly as possible if a field has been incorrectly completed.

## Specs

- Check that **all** fields have been filled
- Ensure the Terms of Service checkbox is ticked
- Ensure the user enters a valid **French zipcode**
- Validate the email format
- Validate the phone number. **French mobile phones only**
- If all fields have been completed correctly, activate the submit button

Open the `form_validation.js` file. This is where you'll code the validation
logic and bind it when the DOM is ready.

## Further suggestions

Have a look at the [focusout](https://api.jquery.com/focusout/) and
[keyup](http://api.jquery.com/keyup/) events.

Use [bootstrap validation state classes](http://getbootstrap.com/css/#forms-control-validation) to add a red background when a field is not properly filled.
