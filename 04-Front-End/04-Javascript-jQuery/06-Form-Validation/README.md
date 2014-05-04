## Background & Objectives

Javascript is useful when it comes to validate forms on the client side.
When people are filling your form, it's best to give them the feedback
as quick as possible if some field is badly filled.

## Specs

- Make sure to check that **all** fields are filled.
- Make sure the Terms of Service checkbox is ticked
- Validate the zipcode format. We want to check for a French one only.
- Validate the email format.
- Validate the phone number. We want to accept French **mobile** phones only.
- If all is in order, activate the submit button so that the user can post the form.

Open the `form_validation.js` file, this is where you'll code the validation
logic and bind it when the DOM is ready.

## Tips

Look at the [focusout](https://api.jquery.com/focusout/) and
[keyup](http://api.jquery.com/keyup/) events.

Use [bootstrap validation state classes](http://getbootstrap.com/css/#forms-control-validation)
to add some red background when a field is not properly filled.